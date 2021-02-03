package main

import (
	"context"
	"flag"
	"net/http"
	"time"

	log "github.com/asim/go-micro/v3/logger"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"google.golang.org/grpc"

	apigateway "creapptive.com/ims-security/api/apigateway"
)

// the creapptive.service.gateway address
var endpoint = flag.String("endpoint", "localhost:9090", "creapptive.service.gateway address")
var httpUrl = flag.String("http", "localhost:8080", "HTTP listen url")

// grpc client middleware that log each grpc client unary call
// reference: https://medium.com/@shijuvar/writing-grpc-interceptors-in-go-bf3e7671fe48
func logUnaryMiddleware(ctx context.Context, method string, req interface{}, reply interface{}, cc *grpc.ClientConn, invoker grpc.UnaryInvoker, opts ...grpc.CallOption) error {
	// Logic before invoking the invoker
	start := time.Now()
	// Calls the invoker to execute RPC
	err := invoker(ctx, method, req, reply, cc, opts...)
	// Logic after invoking the invoker
	log.Infof("method=%s; took=%s; err=%v", method, time.Since(start), err)
	return err
}

func run() error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{
		grpc.WithInsecure(),
		grpc.WithUnaryInterceptor(logUnaryMiddleware),
	}
	err := apigateway.RegisterApigatewayHandlerFromEndpoint(ctx, mux, *endpoint, opts)
	if err != nil {
		return err
	}

	log.Infof("apigateway listening at %v", *httpUrl)
	return http.ListenAndServe(*httpUrl, mux)
}

func main() {
	flag.Parse()

	if err := run(); err != nil {
		log.Fatal(err)
	}
}

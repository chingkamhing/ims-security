package main

import (
	"context"
	"flag"
	"net/http"
	"time"

	"github.com/golang/glog"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	log "github.com/micro/go-micro/v2/logger"
	"google.golang.org/grpc"

	apigateway "creapptive.com/ims-security/api/apigateway"
)

// the creapptive.service.apigateway address
var endpoint = flag.String("endpoint", "localhost:9090", "creapptive.service.apigateway address")

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
		grpc.WithUnaryInterceptor(grpc_middleware.ChainUnaryClient(logUnaryMiddleware)),
	}
	err := apigateway.RegisterApigatewayHandlerFromEndpoint(ctx, mux, *endpoint, opts)
	if err != nil {
		return err
	}

	return http.ListenAndServe(":8080", mux)
}

func main() {
	flag.Parse()

	defer glog.Flush()

	if err := run(); err != nil {
		glog.Fatal(err)
	}
}

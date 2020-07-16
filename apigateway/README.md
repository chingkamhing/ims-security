# apigateway

## Description
* this is a GRPC gateway that solely connect REST endpoint to gateway-service
* this project is copied from github.com/micro/examples/gateway
* please refer [GRPC Gateway](https://m3o.com/docs/grpc-gateway.html#running-the-example) for instructions
* the endpoint is defined in api/pb/apigateway.proto, api/pb/message.proto and api/pb/model.proto
* add middleware to log all endpoints

## Limitations
* note: the limitation is copied from [GRPC Gateway](https://m3o.com/docs/grpc-gateway.html#running-the-example)
    + the example grpc gateway requires a service address to be provided whereas our own micro api uses service discovery, dynamic routing and load balancing. This makes integration of the grpc gateway a little less versatile.

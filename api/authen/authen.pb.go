// Code generated by protoc-gen-go. DO NOT EDIT.
// source: authen.proto

/*
Package creapptive_api is a generated protocol buffer package.

It is generated from these files:
	authen.proto

It has these top-level messages:
	AuthenMessage
*/
package creapptive_api

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"
import _ "creapptive/go-micro/api/message"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type AuthenMessage struct {
	Say string `protobuf:"bytes,1,opt,name=say" json:"say,omitempty"`
}

func (m *AuthenMessage) Reset()                    { *m = AuthenMessage{} }
func (m *AuthenMessage) String() string            { return proto.CompactTextString(m) }
func (*AuthenMessage) ProtoMessage()               {}
func (*AuthenMessage) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *AuthenMessage) GetSay() string {
	if m != nil {
		return m.Say
	}
	return ""
}

func init() {
	proto.RegisterType((*AuthenMessage)(nil), "creapptive.api.AuthenMessage")
}

func init() { proto.RegisterFile("authen.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 193 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xe2, 0xe2, 0x49, 0x2c, 0x2d, 0xc9,
	0x48, 0xcd, 0xd3, 0x2b, 0x28, 0xca, 0x2f, 0xc9, 0x17, 0xe2, 0x4b, 0x2e, 0x4a, 0x4d, 0x2c, 0x28,
	0x28, 0xc9, 0x2c, 0x4b, 0xd5, 0x4b, 0x2c, 0xc8, 0x94, 0xe2, 0xcd, 0x4d, 0x2d, 0x2e, 0x4e, 0x4c,
	0x4f, 0x85, 0x48, 0x2b, 0x29, 0x72, 0xf1, 0x3a, 0x82, 0x95, 0xfb, 0x42, 0x84, 0x85, 0x04, 0xb8,
	0x98, 0x8b, 0x13, 0x2b, 0x25, 0x18, 0x15, 0x18, 0x35, 0x38, 0x83, 0x40, 0x4c, 0xa3, 0x45, 0x4c,
	0x5c, 0x6c, 0x10, 0x35, 0x42, 0xde, 0x5c, 0xac, 0x3e, 0xf9, 0xe9, 0x99, 0x79, 0x42, 0x0a, 0x7a,
	0x48, 0xc6, 0xc2, 0x4c, 0x04, 0x4b, 0x05, 0xa5, 0x16, 0x96, 0xa6, 0x16, 0x97, 0x48, 0xc9, 0xe1,
	0x51, 0x51, 0x90, 0x53, 0xa9, 0xc4, 0x20, 0x94, 0xc6, 0xc5, 0xe7, 0x9c, 0x91, 0x98, 0x97, 0x9e,
	0x1a, 0x90, 0x58, 0x5c, 0x5c, 0x9e, 0x5f, 0x94, 0x22, 0xa4, 0x89, 0x4d, 0x0f, 0xaa, 0x1a, 0x98,
	0xf1, 0xea, 0xc4, 0x28, 0x85, 0xd8, 0x93, 0xcc, 0xc5, 0x1b, 0x94, 0x5a, 0x9c, 0x5a, 0x02, 0xb7,
	0x46, 0x03, 0x9b, 0x5e, 0x14, 0x25, 0x30, 0x5b, 0xd4, 0x88, 0x50, 0x09, 0xb6, 0x24, 0x89, 0x0d,
	0x1c, 0x9c, 0xc6, 0x80, 0x00, 0x00, 0x00, 0xff, 0xff, 0x26, 0xe2, 0x1d, 0x62, 0x7d, 0x01, 0x00,
	0x00,
}

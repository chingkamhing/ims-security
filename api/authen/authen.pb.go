// Code generated by protoc-gen-go. DO NOT EDIT.
// source: authen.proto

package authen

import (
	_ "creapptive.com/ims-security/api/message"
	fmt "fmt"
	proto "github.com/golang/protobuf/proto"
	math "math"
)

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion3 // please upgrade the proto package

type AuthenLoginReply struct {
	Data                 *AuthUser `protobuf:"bytes,1,opt,name=data,proto3" json:"data,omitempty"`
	Error                string    `protobuf:"bytes,2,opt,name=error,proto3" json:"error,omitempty"`
	XXX_NoUnkeyedLiteral struct{}  `json:"-"`
	XXX_unrecognized     []byte    `json:"-"`
	XXX_sizecache        int32     `json:"-"`
}

func (m *AuthenLoginReply) Reset()         { *m = AuthenLoginReply{} }
func (m *AuthenLoginReply) String() string { return proto.CompactTextString(m) }
func (*AuthenLoginReply) ProtoMessage()    {}
func (*AuthenLoginReply) Descriptor() ([]byte, []int) {
	return fileDescriptor_ee8763ef3cea7ebf, []int{0}
}

func (m *AuthenLoginReply) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AuthenLoginReply.Unmarshal(m, b)
}
func (m *AuthenLoginReply) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AuthenLoginReply.Marshal(b, m, deterministic)
}
func (m *AuthenLoginReply) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AuthenLoginReply.Merge(m, src)
}
func (m *AuthenLoginReply) XXX_Size() int {
	return xxx_messageInfo_AuthenLoginReply.Size(m)
}
func (m *AuthenLoginReply) XXX_DiscardUnknown() {
	xxx_messageInfo_AuthenLoginReply.DiscardUnknown(m)
}

var xxx_messageInfo_AuthenLoginReply proto.InternalMessageInfo

func (m *AuthenLoginReply) GetData() *AuthUser {
	if m != nil {
		return m.Data
	}
	return nil
}

func (m *AuthenLoginReply) GetError() string {
	if m != nil {
		return m.Error
	}
	return ""
}

type AuthUser struct {
	// @inject_tag: bson:"_id,omitempty"
	Id                   string   `protobuf:"bytes,1,opt,name=id,proto3" json:"id,omitempty" bson:"_id,omitempty"`
	Username             string   `protobuf:"bytes,2,opt,name=username,proto3" json:"username,omitempty"`
	FailAt               string   `protobuf:"bytes,3,opt,name=failAt,proto3" json:"failAt,omitempty"`
	FailCount            string   `protobuf:"bytes,4,opt,name=failCount,proto3" json:"failCount,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AuthUser) Reset()         { *m = AuthUser{} }
func (m *AuthUser) String() string { return proto.CompactTextString(m) }
func (*AuthUser) ProtoMessage()    {}
func (*AuthUser) Descriptor() ([]byte, []int) {
	return fileDescriptor_ee8763ef3cea7ebf, []int{1}
}

func (m *AuthUser) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AuthUser.Unmarshal(m, b)
}
func (m *AuthUser) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AuthUser.Marshal(b, m, deterministic)
}
func (m *AuthUser) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AuthUser.Merge(m, src)
}
func (m *AuthUser) XXX_Size() int {
	return xxx_messageInfo_AuthUser.Size(m)
}
func (m *AuthUser) XXX_DiscardUnknown() {
	xxx_messageInfo_AuthUser.DiscardUnknown(m)
}

var xxx_messageInfo_AuthUser proto.InternalMessageInfo

func (m *AuthUser) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *AuthUser) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func (m *AuthUser) GetFailAt() string {
	if m != nil {
		return m.FailAt
	}
	return ""
}

func (m *AuthUser) GetFailCount() string {
	if m != nil {
		return m.FailCount
	}
	return ""
}

type AuthenMessage struct {
	Say                  string   `protobuf:"bytes,1,opt,name=say,proto3" json:"say,omitempty"`
	XXX_NoUnkeyedLiteral struct{} `json:"-"`
	XXX_unrecognized     []byte   `json:"-"`
	XXX_sizecache        int32    `json:"-"`
}

func (m *AuthenMessage) Reset()         { *m = AuthenMessage{} }
func (m *AuthenMessage) String() string { return proto.CompactTextString(m) }
func (*AuthenMessage) ProtoMessage()    {}
func (*AuthenMessage) Descriptor() ([]byte, []int) {
	return fileDescriptor_ee8763ef3cea7ebf, []int{2}
}

func (m *AuthenMessage) XXX_Unmarshal(b []byte) error {
	return xxx_messageInfo_AuthenMessage.Unmarshal(m, b)
}
func (m *AuthenMessage) XXX_Marshal(b []byte, deterministic bool) ([]byte, error) {
	return xxx_messageInfo_AuthenMessage.Marshal(b, m, deterministic)
}
func (m *AuthenMessage) XXX_Merge(src proto.Message) {
	xxx_messageInfo_AuthenMessage.Merge(m, src)
}
func (m *AuthenMessage) XXX_Size() int {
	return xxx_messageInfo_AuthenMessage.Size(m)
}
func (m *AuthenMessage) XXX_DiscardUnknown() {
	xxx_messageInfo_AuthenMessage.DiscardUnknown(m)
}

var xxx_messageInfo_AuthenMessage proto.InternalMessageInfo

func (m *AuthenMessage) GetSay() string {
	if m != nil {
		return m.Say
	}
	return ""
}

func init() {
	proto.RegisterType((*AuthenLoginReply)(nil), "creapptive.api.AuthenLoginReply")
	proto.RegisterType((*AuthUser)(nil), "creapptive.api.AuthUser")
	proto.RegisterType((*AuthenMessage)(nil), "creapptive.api.AuthenMessage")
}

func init() { proto.RegisterFile("authen.proto", fileDescriptor_ee8763ef3cea7ebf) }

var fileDescriptor_ee8763ef3cea7ebf = []byte{
	// 326 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0x8c, 0x92, 0x4f, 0x6b, 0xf2, 0x40,
	0x10, 0xc6, 0x5f, 0xe3, 0x1f, 0x74, 0xde, 0x2a, 0xb2, 0x94, 0x12, 0xa4, 0x87, 0x34, 0x07, 0x9b,
	0x42, 0x1b, 0xc1, 0x7e, 0x02, 0xeb, 0xb5, 0x42, 0x09, 0xb4, 0x87, 0xde, 0xa6, 0xc9, 0xa8, 0x0b,
	0x26, 0xbb, 0xdd, 0xdd, 0xb4, 0xf8, 0x7d, 0xfa, 0x41, 0x8b, 0xbb, 0x89, 0x55, 0xf0, 0xe0, 0x6d,
	0x67, 0xe7, 0x37, 0xf3, 0xf0, 0x3c, 0x0c, 0x5c, 0x60, 0x69, 0xd6, 0x54, 0xc4, 0x52, 0x09, 0x23,
	0xd8, 0x20, 0x55, 0x84, 0x52, 0x1a, 0xfe, 0x45, 0x31, 0x4a, 0x3e, 0xea, 0xe7, 0xa4, 0x35, 0xae,
	0xc8, 0xb5, 0xc3, 0x37, 0x18, 0xce, 0x2c, 0xfe, 0x2c, 0x56, 0xbc, 0x48, 0x48, 0x6e, 0xb6, 0xec,
	0x1e, 0x5a, 0x19, 0x1a, 0xf4, 0x1b, 0x41, 0x23, 0xfa, 0x3f, 0xf5, 0xe3, 0xe3, 0x0d, 0xf1, 0x8e,
	0x7f, 0xd5, 0xa4, 0x12, 0x4b, 0xb1, 0x4b, 0x68, 0x93, 0x52, 0x42, 0xf9, 0x5e, 0xd0, 0x88, 0x7a,
	0x89, 0x2b, 0xc2, 0x0d, 0x74, 0x6b, 0x8e, 0x0d, 0xc0, 0xe3, 0x99, 0xdd, 0xd6, 0x4b, 0x3c, 0x9e,
	0xb1, 0x11, 0x74, 0x4b, 0x4d, 0xaa, 0xc0, 0x9c, 0xaa, 0xa1, 0x7d, 0xcd, 0xae, 0xa0, 0xb3, 0x44,
	0xbe, 0x99, 0x19, 0xbf, 0x69, 0x3b, 0x55, 0xc5, 0xae, 0xa1, 0xb7, 0x7b, 0xcd, 0x45, 0x59, 0x18,
	0xbf, 0x65, 0x5b, 0x7f, 0x1f, 0xe1, 0x0d, 0xf4, 0x9d, 0x8b, 0x85, 0x33, 0xc7, 0x86, 0xd0, 0xd4,
	0xb8, 0xad, 0x34, 0x77, 0xcf, 0xe9, 0x8f, 0x07, 0x1d, 0xc7, 0xb0, 0x05, 0xb4, 0xad, 0x5b, 0x16,
	0x1c, 0x5a, 0xab, 0x73, 0xa9, 0x82, 0xf8, 0x2c, 0x49, 0x9b, 0x51, 0x70, 0xca, 0xfc, 0x61, 0x58,
	0xe1, 0x3f, 0xb6, 0x84, 0xc1, 0x7c, 0x8d, 0xc5, 0x8a, 0x5e, 0x50, 0xeb, 0x6f, 0xa1, 0x32, 0x76,
	0x77, 0x6a, 0xef, 0x31, 0x53, 0x0b, 0xdc, 0x9e, 0x83, 0x3a, 0x9d, 0x14, 0xfa, 0x09, 0x69, 0x32,
	0x7b, 0x99, 0xe8, 0xd4, 0xec, 0x11, 0x52, 0xab, 0x8c, 0xcf, 0x20, 0xad, 0xc8, 0x53, 0xf4, 0x3e,
	0x3e, 0x40, 0x53, 0x91, 0x4f, 0x78, 0xae, 0x1f, 0x34, 0xa5, 0xa5, 0xe2, 0x66, 0x3b, 0x41, 0xc9,
	0x27, 0xee, 0xbc, 0x3e, 0x3a, 0xf6, 0x80, 0x1e, 0x7f, 0x03, 0x00, 0x00, 0xff, 0xff, 0x0b, 0x1b,
	0xb1, 0x4d, 0x6f, 0x02, 0x00, 0x00,
}

// Code generated by protoc-gen-go. DO NOT EDIT.
// source: model.proto

/*
Package model is a generated protocol buffer package.

It is generated from these files:
	model.proto

It has these top-level messages:
	User
	Myself
	PrivilegeProfile
	LocationNode
	ScopeNode
	ChangeVersion
*/
package model

import proto "github.com/golang/protobuf/proto"
import fmt "fmt"
import math "math"

// Reference imports to suppress errors if they are not otherwise used.
var _ = proto.Marshal
var _ = fmt.Errorf
var _ = math.Inf

// This is a compile-time assertion to ensure that this generated file
// is compatible with the proto package it is being compiled against.
// A compilation error at this line likely means your copy of the
// proto package needs to be updated.
const _ = proto.ProtoPackageIsVersion2 // please upgrade the proto package

type User struct {
	Id                 string   `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	LocationIDs        []string `protobuf:"bytes,2,rep,name=locationIDs" json:"locationIDs,omitempty"`
	ScopeID            string   `protobuf:"bytes,3,opt,name=scopeID" json:"scopeID,omitempty"`
	PrivilegeProfileID string   `protobuf:"bytes,4,opt,name=privilegeProfileID" json:"privilegeProfileID,omitempty"`
	Username           string   `protobuf:"bytes,5,opt,name=username" json:"username,omitempty"`
	Password           string   `protobuf:"bytes,6,opt,name=password" json:"password,omitempty"`
	Name               string   `protobuf:"bytes,7,opt,name=name" json:"name,omitempty"`
	Email              string   `protobuf:"bytes,8,opt,name=email" json:"email,omitempty"`
	PhoneNumber        string   `protobuf:"bytes,9,opt,name=phoneNumber" json:"phoneNumber,omitempty"`
	Description        string   `protobuf:"bytes,10,opt,name=description" json:"description,omitempty"`
}

func (m *User) Reset()                    { *m = User{} }
func (m *User) String() string            { return proto.CompactTextString(m) }
func (*User) ProtoMessage()               {}
func (*User) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{0} }

func (m *User) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *User) GetLocationIDs() []string {
	if m != nil {
		return m.LocationIDs
	}
	return nil
}

func (m *User) GetScopeID() string {
	if m != nil {
		return m.ScopeID
	}
	return ""
}

func (m *User) GetPrivilegeProfileID() string {
	if m != nil {
		return m.PrivilegeProfileID
	}
	return ""
}

func (m *User) GetUsername() string {
	if m != nil {
		return m.Username
	}
	return ""
}

func (m *User) GetPassword() string {
	if m != nil {
		return m.Password
	}
	return ""
}

func (m *User) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *User) GetEmail() string {
	if m != nil {
		return m.Email
	}
	return ""
}

func (m *User) GetPhoneNumber() string {
	if m != nil {
		return m.PhoneNumber
	}
	return ""
}

func (m *User) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

type Myself struct {
	User             *User             `protobuf:"bytes,1,opt,name=user" json:"user,omitempty"`
	PrivilegeProfile *PrivilegeProfile `protobuf:"bytes,2,opt,name=privilegeProfile" json:"privilegeProfile,omitempty"`
}

func (m *Myself) Reset()                    { *m = Myself{} }
func (m *Myself) String() string            { return proto.CompactTextString(m) }
func (*Myself) ProtoMessage()               {}
func (*Myself) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{1} }

func (m *Myself) GetUser() *User {
	if m != nil {
		return m.User
	}
	return nil
}

func (m *Myself) GetPrivilegeProfile() *PrivilegeProfile {
	if m != nil {
		return m.PrivilegeProfile
	}
	return nil
}

type PrivilegeProfile struct {
	Id          string   `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	Name        string   `protobuf:"bytes,2,opt,name=name" json:"name,omitempty"`
	Description string   `protobuf:"bytes,3,opt,name=description" json:"description,omitempty"`
	Privileges  []string `protobuf:"bytes,4,rep,name=privileges" json:"privileges,omitempty"`
}

func (m *PrivilegeProfile) Reset()                    { *m = PrivilegeProfile{} }
func (m *PrivilegeProfile) String() string            { return proto.CompactTextString(m) }
func (*PrivilegeProfile) ProtoMessage()               {}
func (*PrivilegeProfile) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{2} }

func (m *PrivilegeProfile) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *PrivilegeProfile) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *PrivilegeProfile) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *PrivilegeProfile) GetPrivileges() []string {
	if m != nil {
		return m.Privileges
	}
	return nil
}

type LocationNode struct {
	Id          string          `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	Name        string          `protobuf:"bytes,2,opt,name=name" json:"name,omitempty"`
	Description string          `protobuf:"bytes,3,opt,name=description" json:"description,omitempty"`
	ParentID    string          `protobuf:"bytes,4,opt,name=parentID" json:"parentID,omitempty"`
	Children    []*LocationNode `protobuf:"bytes,5,rep,name=children" json:"children,omitempty"`
}

func (m *LocationNode) Reset()                    { *m = LocationNode{} }
func (m *LocationNode) String() string            { return proto.CompactTextString(m) }
func (*LocationNode) ProtoMessage()               {}
func (*LocationNode) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{3} }

func (m *LocationNode) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *LocationNode) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *LocationNode) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *LocationNode) GetParentID() string {
	if m != nil {
		return m.ParentID
	}
	return ""
}

func (m *LocationNode) GetChildren() []*LocationNode {
	if m != nil {
		return m.Children
	}
	return nil
}

type ScopeNode struct {
	Id          string          `protobuf:"bytes,1,opt,name=id" json:"id,omitempty"`
	Name        string          `protobuf:"bytes,2,opt,name=name" json:"name,omitempty"`
	Description string          `protobuf:"bytes,3,opt,name=description" json:"description,omitempty"`
	ParentID    string          `protobuf:"bytes,4,opt,name=parentID" json:"parentID,omitempty"`
	Children    []*LocationNode `protobuf:"bytes,5,rep,name=children" json:"children,omitempty"`
}

func (m *ScopeNode) Reset()                    { *m = ScopeNode{} }
func (m *ScopeNode) String() string            { return proto.CompactTextString(m) }
func (*ScopeNode) ProtoMessage()               {}
func (*ScopeNode) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{4} }

func (m *ScopeNode) GetId() string {
	if m != nil {
		return m.Id
	}
	return ""
}

func (m *ScopeNode) GetName() string {
	if m != nil {
		return m.Name
	}
	return ""
}

func (m *ScopeNode) GetDescription() string {
	if m != nil {
		return m.Description
	}
	return ""
}

func (m *ScopeNode) GetParentID() string {
	if m != nil {
		return m.ParentID
	}
	return ""
}

func (m *ScopeNode) GetChildren() []*LocationNode {
	if m != nil {
		return m.Children
	}
	return nil
}

type ChangeVersion struct {
	User             string `protobuf:"bytes,1,opt,name=user" json:"user,omitempty"`
	PrivilegeProfile string `protobuf:"bytes,2,opt,name=PrivilegeProfile" json:"PrivilegeProfile,omitempty"`
	Location         string `protobuf:"bytes,3,opt,name=Location" json:"Location,omitempty"`
	Scope            string `protobuf:"bytes,4,opt,name=Scope" json:"Scope,omitempty"`
}

func (m *ChangeVersion) Reset()                    { *m = ChangeVersion{} }
func (m *ChangeVersion) String() string            { return proto.CompactTextString(m) }
func (*ChangeVersion) ProtoMessage()               {}
func (*ChangeVersion) Descriptor() ([]byte, []int) { return fileDescriptor0, []int{5} }

func (m *ChangeVersion) GetUser() string {
	if m != nil {
		return m.User
	}
	return ""
}

func (m *ChangeVersion) GetPrivilegeProfile() string {
	if m != nil {
		return m.PrivilegeProfile
	}
	return ""
}

func (m *ChangeVersion) GetLocation() string {
	if m != nil {
		return m.Location
	}
	return ""
}

func (m *ChangeVersion) GetScope() string {
	if m != nil {
		return m.Scope
	}
	return ""
}

func init() {
	proto.RegisterType((*User)(nil), "creapptive.model.User")
	proto.RegisterType((*Myself)(nil), "creapptive.model.Myself")
	proto.RegisterType((*PrivilegeProfile)(nil), "creapptive.model.PrivilegeProfile")
	proto.RegisterType((*LocationNode)(nil), "creapptive.model.LocationNode")
	proto.RegisterType((*ScopeNode)(nil), "creapptive.model.ScopeNode")
	proto.RegisterType((*ChangeVersion)(nil), "creapptive.model.ChangeVersion")
}

func init() { proto.RegisterFile("model.proto", fileDescriptor0) }

var fileDescriptor0 = []byte{
	// 434 bytes of a gzipped FileDescriptorProto
	0x1f, 0x8b, 0x08, 0x00, 0x00, 0x00, 0x00, 0x00, 0x02, 0xff, 0xd4, 0x54, 0x4d, 0x8b, 0xd4, 0x40,
	0x10, 0x25, 0x1f, 0x33, 0x9b, 0x54, 0x54, 0x86, 0x46, 0xa4, 0x59, 0x70, 0x0d, 0x39, 0x0d, 0x0b,
	0x66, 0x60, 0xbd, 0x79, 0xd4, 0xbd, 0x2c, 0xe8, 0xb0, 0x44, 0xf4, 0xe0, 0x2d, 0x9b, 0xd4, 0xce,
	0x34, 0x24, 0xe9, 0xa6, 0x3b, 0xbb, 0xea, 0x51, 0xf0, 0xc7, 0x28, 0xf8, 0x23, 0xa5, 0x2b, 0x1f,
	0x86, 0xc4, 0xa3, 0x97, 0xbd, 0xcd, 0x7b, 0xfd, 0x8a, 0xaa, 0xf7, 0xaa, 0x26, 0x10, 0xd5, 0xb2,
	0xc4, 0x2a, 0x55, 0x5a, 0xb6, 0x92, 0x6d, 0x0a, 0x8d, 0xb9, 0x52, 0xad, 0xb8, 0xc7, 0x94, 0xf8,
	0xe4, 0xa7, 0x0b, 0xfe, 0x47, 0x83, 0x9a, 0x3d, 0x01, 0x57, 0x94, 0xdc, 0x89, 0x9d, 0x6d, 0x98,
	0xb9, 0xa2, 0x64, 0x31, 0x44, 0x95, 0x2c, 0xf2, 0x56, 0xc8, 0xe6, 0xea, 0xd2, 0x70, 0x37, 0xf6,
	0xb6, 0x61, 0x36, 0xa5, 0x18, 0x87, 0x13, 0x53, 0x48, 0x85, 0x57, 0x97, 0xdc, 0xa3, 0xb2, 0x01,
	0xb2, 0x14, 0x98, 0xd2, 0xe2, 0x5e, 0x54, 0x78, 0xc0, 0x6b, 0x2d, 0x6f, 0x45, 0x65, 0x45, 0x3e,
	0x89, 0xfe, 0xf1, 0xc2, 0x4e, 0x21, 0xb8, 0x33, 0xa8, 0x9b, 0xbc, 0x46, 0xbe, 0x22, 0xd5, 0x88,
	0xed, 0x9b, 0xca, 0x8d, 0xf9, 0x22, 0x75, 0xc9, 0xd7, 0xdd, 0xdb, 0x80, 0x19, 0x03, 0x9f, 0x6a,
	0x4e, 0x88, 0xa7, 0xdf, 0xec, 0x29, 0xac, 0xb0, 0xce, 0x45, 0xc5, 0x03, 0x22, 0x3b, 0x60, 0xdd,
	0xa8, 0xa3, 0x6c, 0x70, 0x7f, 0x57, 0xdf, 0xa0, 0xe6, 0x21, 0xbd, 0x4d, 0x29, 0xab, 0x28, 0xd1,
	0x14, 0x5a, 0x28, 0xeb, 0x8f, 0x43, 0xa7, 0x98, 0x50, 0xc9, 0x0f, 0x07, 0xd6, 0xef, 0xbf, 0x19,
	0xac, 0x6e, 0xd9, 0x39, 0xf8, 0x76, 0x40, 0x8a, 0x2b, 0xba, 0x78, 0x96, 0xce, 0x63, 0x4d, 0x6d,
	0xa4, 0x19, 0x69, 0xd8, 0x1e, 0x36, 0x73, 0xcb, 0xdc, 0xa5, 0xba, 0x64, 0x59, 0x77, 0x3d, 0x53,
	0x66, 0x8b, 0xda, 0xe4, 0x2b, 0x6c, 0xe6, 0xaa, 0xc5, 0xf2, 0x86, 0x60, 0xdc, 0x49, 0x30, 0x33,
	0x83, 0xde, 0xc2, 0x20, 0x3b, 0x03, 0x18, 0xbb, 0x19, 0xee, 0xd3, 0xc6, 0x27, 0x4c, 0xf2, 0xdb,
	0x81, 0x47, 0xef, 0xfa, 0x03, 0xd8, 0xcb, 0xf2, 0x7f, 0xb5, 0xa5, 0x0d, 0x6b, 0x6c, 0xda, 0xf1,
	0x46, 0x46, 0xcc, 0x5e, 0x43, 0x50, 0x1c, 0x45, 0x55, 0x6a, 0x6c, 0xf8, 0x2a, 0xf6, 0xb6, 0xd1,
	0xc5, 0xd9, 0x32, 0xb4, 0xe9, 0x4c, 0xd9, 0xa8, 0x4f, 0x7e, 0x39, 0x10, 0x7e, 0xb0, 0x17, 0xf9,
	0x00, 0x66, 0xfd, 0xee, 0xc0, 0xe3, 0xb7, 0xc7, 0xbc, 0x39, 0xe0, 0x27, 0xd4, 0xc6, 0x76, 0x62,
	0x93, 0x13, 0x0b, 0xfb, 0x53, 0x3a, 0x5f, 0xae, 0xbe, 0x9f, 0x7f, 0x79, 0x12, 0xa7, 0x10, 0x0c,
	0xbd, 0x7a, 0x23, 0x23, 0xb6, 0xff, 0x11, 0x0a, 0xa6, 0xb7, 0xd0, 0x81, 0x37, 0x2f, 0x3e, 0x3f,
	0xff, 0x3b, 0xee, 0xee, 0x20, 0x5f, 0xd6, 0xa2, 0xd0, 0x72, 0x97, 0x2b, 0xb1, 0xa3, 0xd9, 0x6f,
	0xd6, 0xf4, 0x11, 0x79, 0xf5, 0x27, 0x00, 0x00, 0xff, 0xff, 0x95, 0x72, 0x5c, 0x47, 0x53, 0x04,
	0x00, 0x00,
}

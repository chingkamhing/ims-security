package lib

import (
	"golang.org/x/crypto/bcrypt"
)

// ============================================================================
// password hash helper function
// ============================================================================

// HashPassword hash and salt the input password and return the result
func HashPassword(password string, moreLessCost int) (hashed []byte, err error) {
	return bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost+moreLessCost)
}

// ComparePassword compare with the input password with another hashed password and return the result
func ComparePassword(password string, hashedPassword []byte) error {
	return bcrypt.CompareHashAndPassword(hashedPassword, []byte(password))
}

//go:build darwin

package main

/*
#cgo darwin LDFLAGS: -framework Cocoa
void installDeepOrinSystemQuitHook(void);
*/
import "C"

import "sync"

var installSystemQuitHookOnce sync.Once

func installSystemQuitHook() {
	installSystemQuitHookOnce.Do(func() {
		C.installDeepOrinSystemQuitHook()
	})
}

//export DeepOrinMarkSystemQuit
func DeepOrinMarkSystemQuit() {
	markSystemQuitRequested()
}

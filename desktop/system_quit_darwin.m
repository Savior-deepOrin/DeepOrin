//go:build darwin

#import <Cocoa/Cocoa.h>
#import <objc/runtime.h>

extern void DeepOrinMarkSystemQuit(void);

static NSApplicationTerminateReply (*originalApplicationShouldTerminate)(id, SEL, NSApplication *);
static void (*originalWailsContextQuit)(id, SEL);

static NSApplicationTerminateReply deepOrinApplicationShouldTerminate(id self, SEL _cmd, NSApplication *sender) {
    DeepOrinMarkSystemQuit();
    if (originalApplicationShouldTerminate != NULL) {
        return originalApplicationShouldTerminate(self, _cmd, sender);
    }
    return NSTerminateNow;
}

static void deepOrinWailsContextQuit(id self, SEL _cmd) {
    DeepOrinMarkSystemQuit();
    if (originalWailsContextQuit != NULL) {
        originalWailsContextQuit(self, _cmd);
    }
}

void installDeepOrinSystemQuitHook(void) {
    Class appDelegate = NSClassFromString(@"AppDelegate");
    SEL selector = @selector(applicationShouldTerminate:);
    Method method = appDelegate == Nil ? NULL : class_getInstanceMethod(appDelegate, selector);
    if (method != NULL) {
        IMP replacement = (IMP)deepOrinApplicationShouldTerminate;
        IMP previous = method_setImplementation(method, replacement);
        originalApplicationShouldTerminate = (NSApplicationTerminateReply (*)(id, SEL, NSApplication *))previous;
    }

    Class wailsContext = NSClassFromString(@"WailsContext");
    SEL quitSelector = @selector(Quit);
    Method quitMethod = wailsContext == Nil ? NULL : class_getInstanceMethod(wailsContext, quitSelector);
    if (quitMethod != NULL) {
        IMP replacement = (IMP)deepOrinWailsContextQuit;
        IMP previous = method_setImplementation(quitMethod, replacement);
        originalWailsContextQuit = (void (*)(id, SEL))previous;
    }
}

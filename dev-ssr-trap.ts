Object.defineProperty(global, "localStorage", {
  get() {
    const err = new Error("🚨 localStorage accessed during SSR — FIND THIS");
    console.error(err.stack);  // <- DUMP FULL STACK
    throw err;
  },
  configurable: true,
});

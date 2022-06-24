"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLIOutput = void 0;
class CLIOutput {
    print(message) {
        console.log(">>>", message);
    }
    alert(message, type = "InternalError") {
        console.log(">>>", `[${type}]`, message);
    }
}
exports.CLIOutput = CLIOutput;
//# sourceMappingURL=logger.js.map
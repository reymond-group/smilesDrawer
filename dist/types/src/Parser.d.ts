declare namespace _default {
    export { peg$SyntaxError as SyntaxError };
    export { peg$parse as parse };
}
export default _default;
declare function peg$SyntaxError(message: any, expected: any, found: any, location: any): void;
declare namespace peg$SyntaxError {
    function buildMessage(expected: any, found: any): string;
}
declare class peg$SyntaxError {
    constructor(message: any, expected: any, found: any, location: any);
    message: any;
    expected: any;
    found: any;
    location: any;
    name: string;
}
declare function peg$parse(input: any, options: any): any;

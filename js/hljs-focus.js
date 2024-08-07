class $149c1bd638913645$export$1b2acd5f94cd84db {
    constructor(options){
        this.currentAttribute = "";
        this.options = options;
    }
    'before:highlight'(context) {
        if (context.language.indexOf("@")) {
            let [lang, attr] = context.language.split('@');
            context.language = lang;
            this.currentAttribute = attr ?? "";
        }
    }
    getStyle(style) {
        if (!style) return "";
        return Object.keys(style).reduce((acc, key)=>acc + key.split(/(?=[A-Z])/).join('-').toLowerCase() + ':' + style[key] + ';'
        , '');
    }
    getFocusedLines(input) {
        const [command, param] = input.trim().split('=');
        let result = [];
        if (command === 'focus') param.split(",").forEach((num)=>{
            if (num.indexOf(":") !== -1) {
                let [from_s, to_s] = num.split(":");
                let from = +from_s;
                let to = +to_s;
                result = result.concat(Array(to - from + 1).fill(0).map((_, i)=>from + i
                ));
            } else result.push(+num);
        });
        result = result.filter((n)=>n > 0 && !isNaN(n)
        ).sort((a, b)=>a - b
        );
        return [
            ...new Set(result)
        ];
    }
    'after:highlight'(result) {
        if (!result.value.includes('hljs-focus processed')) {
            const focusedLines = this.getFocusedLines(this.currentAttribute);
            const lines = result.value.split("\n").map((line, num)=>{
                const focused = focusedLines.indexOf(num + 1) !== -1;
                const focusState = focusedLines.length === 0 ? 'normal' : focused ? 'focused' : 'unfocused';
                const styles = this.getStyle(focusedLines.length === 0 ? this.options?.normalStyle : focused ? this.options?.focusedStyle : this.options?.unfocusedStyle);
                return `<span class="hljs-focus ${focusState}" style="${styles}">${line || " "}</span>`;
            });
            result.value = lines.join("\n").trim() + "<i style='display: none' class='hljs-focus processed'></i>";
        }
    }
}


export {$149c1bd638913645$export$1b2acd5f94cd84db as LineFocusPlugin};
//# sourceMappingURL=module.js.map

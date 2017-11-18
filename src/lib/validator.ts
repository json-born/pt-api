import * as validator from 'validator';
import { Context } from 'koa';
import { error } from 'util';


export default function validate(fields: Object): (ctx: Context, next: Function) => Promise<any> {
    return async (ctx: Context, next: Function): Promise<any>  => {
        const errors: Object = {};
        
        Object.keys(fields).forEach(field => {
            let ruleSet: string[] = fields[field];
            const errorMessage: string = ruleSet[ruleSet.length - 1];
            const fieldValue: string = ctx.request.body[field];

            for (let rule of ruleSet.slice(0, -1)) {
                let validRule: boolean = runRule(ctx, rule, fieldValue);
                if(!validRule) {
                    errors[field] = errorMessage;
                }
            }
        });
        
        if (Object.keys(errors).length) {
            ctx.status = 400;
            ctx.response.body = errors;
        } else {
            await next();
        }
    }
}

function runRule(ctx: Context, rule: string, fieldValue: string = ''): boolean {
    const args: string[] = [fieldValue];
    const match: RegExpMatchArray | null = rule.match(/(.*)\((.*)\)/);
    const nullFieldCheck: boolean = !fieldValue || fieldValue.trim() === '';

    if(rule === 'required') {
        return !nullFieldCheck;
    }

    if(match) {
        rule = match[1];
        let param: string = ctx.request.body[match[2]];
        args.push(param);
    }

    return validator[rule](...args);
}
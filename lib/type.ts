import { FC } from "react"

interface ISelectOption {
    label:string,
    value:string,
    [key:string]:any,
}

export type ISelectOptionComponent = FC<{option:ISelectOption,selectedOption?:ISelectOption|null|undefined}>;
export type ISelectValueComponent = FC<{option:ISelectOption|null|undefined,placeholder:string}>;

export type {
    ISelectOption,
}
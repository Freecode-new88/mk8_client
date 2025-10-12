// To parse this data:
//
//   import { Convert, CodeModel } from "./file";
//
//   const codeModel = Convert.toCodeModel(json);

export interface CodeModel {
    point: number;
    promo_code: string;
    time: string;
    min_point: number;
    max_point: number;
}


// Converts JSON strings to/from your types
export class CodeModelConvert {
    public static toCodeModel(json: string): CodeModel {
        return JSON.parse(json);
    }

    public static codeModelToJson(value: CodeModel): string {
        return JSON.stringify(value);
    }
}

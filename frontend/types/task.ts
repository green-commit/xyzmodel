export enum TaskType {
    TEST = "TEST",
}

export enum TaskParamType {
    STRING = 'STRING',
    INTEGER = 'INTEGER',
    FLOAT = 'FLOAT',
    BOOLEAN = 'BOOLEAN',
}

export interface ParamProps {
    param : TaskParam;
}

export interface TaskParam {
    name : string;
    type : TaskParamType;
    helperText ?: string;
    required ?: boolean;
    hideHandle ?: boolean;
    value ?: string | number | boolean;
    [key: string] : any;
}
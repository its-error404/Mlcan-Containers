import { serializable, alias, primitive } from "serializr";

export class RepairDetails {
    @serializable(alias('uid', primitive()))
    repairId?: string

    @serializable(alias('rep_area', primitive()))
    repairArea?:string

    @serializable(alias('dmg_area', primitive()))
    damagedArea?:string

    @serializable(alias('type', primitive()))
    type?:string

}

export class NonMaerskDetails {

    @serializable(alias('hours', primitive()))
    hours?: string

    @serializable(alias('mat_cost', primitive()))
    materialCost?: string

    @serializable(alias('cont_section', primitive()))
    containerSection?: string

    @serializable(alias('dmg_area', primitive()))
    dmgArea?: string

    @serializable(alias('type', primitive()))
    type?: string

    @serializable(alias('desc', primitive()))
    desc?: string

    @serializable(alias('comp', primitive()))
    comp?: string

    @serializable(alias('dam', primitive()))
    dam?: string

    @serializable(alias('rep', primitive()))
    rep?: string

    @serializable(alias('component', primitive()))
    component?: string

    @serializable(alias('event', primitive()))
    event?: string

    @serializable(alias('location', primitive()))
    location?: string

    @serializable(alias('area', primitive()))
    area?: string

    @serializable(alias('area1', primitive()))
    area1?: string

    @serializable(alias('id', primitive()))
    id?: string
}

export class MercPlusDetails {
    @serializable(alias('max_mat_cost', primitive()))
    maxMatCost?: number

    @serializable(alias('unit_mat_cost', primitive()))
    unitMatCost?: number

    @serializable(alias('unit_hours', primitive()))
    unitHours?: number

    @serializable(alias('max_pcs', primitive()))
    maxPcs?: number

    @serializable(alias('unit', primitive()))
    unit?: string

    @serializable(alias('rep_mode', primitive()))
    repMode?: number

    @serializable(alias('mode', primitive()))
    mode?: string

    @serializable(alias('rep_code', primitive()))
    repCode?: string

    @serializable(alias('comb', primitive()))
    comb?: string

    @serializable(alias('desc', primitive()))
    desc?: string

    @serializable(alias('id', primitive()))
    id?: string
 
    @serializable(alias('na', primitive()))
    na_1?: boolean
}

export const initialRepairFormValues = {
    ...new RepairDetails(),
    ...new MercPlusDetails(),
    ...new NonMaerskDetails()
};

export function mongooseToJSON() {
    return (doc: any, ret: any) => {
        const { _id, ...rest } = ret;
        return { id: _id, ...rest };
    }
}

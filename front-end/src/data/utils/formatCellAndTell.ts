
export const formatCellAndTell = (tel: string) => {
    tel = tel.replace(/[^\d]+/g, '')?.slice(0, 11);

    if (tel?.length >= 12 || tel === '') {
        return '';
    }

    if (tel?.length > 10) {
        tel = tel.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
    } else if (tel?.length > 5) {
        tel = tel.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
    } else if (tel?.length > 2) {
        tel = tel.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
    } else {
        tel = tel.replace(/^(\d*)/, "($1");
    }

    return tel;

}



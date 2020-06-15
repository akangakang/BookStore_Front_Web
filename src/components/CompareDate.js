function compareDate(time1, time2) {
    let arys1 = [];
    let arys2 = [];
    if (time1 != null && time2 != null) {
        arys1 = time1.split('-');
        let date1 = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
        arys2 = time2.split('-');
        let date2 = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
        if (date1 > date2) {
            return 1;
            //说明time1比time2迟
        } else if(date1<date2){
            return -1;
            //说明time1比time2早
        }
        else return 0;
    }

}
export default compareDate;

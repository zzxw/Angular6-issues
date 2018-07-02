export class Range {
  range: Object;
  getDateRange(): Object {
    const start1 = new Date();
    const end = new Date();
    start1.setTime(start1.getTime() - 3600 * 24 * 1000 * 6);
    this.range = {};
    this.range['最近一周'] = [start1, end];
    const start2 = new Date();
    start2.setTime(start2.getTime() - 3600 * 24 * 1000 * 29);
    this.range['最近30天'] = [start2, end];
    const start3 = new Date();
    start3.setTime(start3.getTime() - 3600 * 24 * 1000 * 89);
    this.range['最近90天'] = [start3, end];
    const start4 = new Date();
    start4.setTime(start4.getTime() - 3600 * 24 * 1000 * 364);
    this.range['最近一年'] = [start4, end];
    return this.range;
  }
}

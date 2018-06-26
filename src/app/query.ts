export let query = {
  page: {
    currentPage: 1,
    size: 10
  },
  criteria: {
    subject: '',
    status: '',
    daterange: [] // 日期范围
  },
  order: {
    by: '',
    type: ''
  }
};

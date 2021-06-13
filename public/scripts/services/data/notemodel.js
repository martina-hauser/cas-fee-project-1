moment.locale('de-ch');

const notes = [
  {
    id: '01',
    title: 'Homework',
    description: 'Finish this project!',
    importance: 2,
    createdDate: moment('2021-04-28').format('L'),
    dueDate: moment('2021-06-27').format('L'),
    finishedState: true,
    finishedDate: moment('2021-06-27').format(('L')),
  },
  {
    id: '02',
    title: 'Birthday Present',
    description: 'Buy present for your fathers birthday. Ideas: Picknick basket',
    importance: 4,
    createdDate: moment('2021-04-29').format('L'),
    dueDate: moment('2021-06-21').format('L'),
    finishedState: false,
    finishedDate: '',
  },
  {
    id: '03',
    title: 'Exam',
    description: 'Learn the night before',
    importance: 5,
    createdDate: moment('2021-04-27').format('L'),
    dueDate: moment('2021-06-27').format('L'),
    finishedState: false,
    finishedDate: '',
  },
];

export default notes;

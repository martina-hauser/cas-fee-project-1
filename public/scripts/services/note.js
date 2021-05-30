export default class Note {
  constructor(id, title, description, importance, createdDate, duedate, finishedState, finishedDate) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.createdDate = createdDate;
    this.duedate = duedate;
    this.finishState = finishedState;
    this.finishedDate = finishedDate;
  }
}

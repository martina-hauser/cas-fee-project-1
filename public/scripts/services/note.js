export default class Note {
  constructor(title, description, importance, createdDate, dueDate, finishedState, finishedDate) {
    this.title = title;
    this.description = description;
    this.importance = importance;
    this.createdDate = createdDate;
    this.dueDate = dueDate;
    this.finishedState = finishedState;
    this.finishedDate = finishedDate;
  }
}

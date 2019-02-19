class Auditoria extends Component {
  constructor(auditoria) {
    super();
    this.auditoria = auditoria;
    this.auditoriumCards = [];
    for (let auditorium of auditoria) {
      this.auditoriumCards.push(new AuditoriumCard(auditorium));
    }
  }
}
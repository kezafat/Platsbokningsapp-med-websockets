class AuditoriaContainer extends Component {
  constructor() {
    super();
    this.addRoute('/biografer', 'Biografer');
    this.selectedAuditorium = {};
    this.fetched = false;
    this.spinner = new Spinner();
    this.setSelectedAuditorium();
    this.auditoriumId = '';
  }

  async setSelectedAuditorium() {
    const urlParams = new URLSearchParams(window.location.search);
    const auditoriumId = urlParams.get('id');
    this.auditoriumId = auditoriumId;
    // if the showid is null we don't have an auditorium to fetch so we FETCH THEM ALL
    if (auditoriumId === null) {
      this.selectedAuditorium = {};
      const auditoria = await Auditorium.find();
      this.auditoria = new Auditoria(auditoria);
      this.fetched = true;
      this.render();
    }
    this.selectedAuditorium = await Auditorium.find(auditoriumId);
    this.fetched = true;
    this.render();
  }

  mount() {
    this.setSelectedAuditorium();
  }

  unmount() {
    this.fetched = false;
    this.auditoria = false;
    this.selectedAuditorium = false;
  }

  componentDidUpdate() {
    const urlParams = new URLSearchParams(window.location.search);
    const auditoriumId = urlParams.get('id');
    if (this.auditoriumId !== auditoriumId) {
      this.fetched = false;
      this.auditoria = false;
      this.selectedAuditorium = false;
      this.render();
      this.setSelectedAuditorium();
    }
  }
}
import React from 'react';
import Badge from '../components/Badge';
import './styles/BadgeEdit.css';
import BadgeForm from '../components/BadgeForm';
import header from '../images/platziconf-logo.svg';
import api from '../api';
import PageLoading from './PageLoading';

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      avatarUrl: '',
      email: '',
      jobTitle: '',
      twitter: '',
    },
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    this.setState({
      loading: true,
      error: null,
    });
    try {
      const data = await api.badges.read(this.props.match.params.badgeId);
      this.setState({ loading: false, form: data });
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });
    try {
      await api.badges.update(this.props.match.params.badgeId, this.state.form);
      this.setState({ loading: false });
      this.props.history.push('/badges');
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className='BadgeEdit__hero'>
          <img
            className='BadgeEdit__hero-image img-fluid'
            src={header}
            alt='Logo'
          ></img>
        </div>
        <div className='container'>
          <div className='row'>
            <div className='col-6'>
              <Badge
                firstName={this.state.form.firstName || 'Juan'}
                lastName={this.state.form.lastName || 'Guaña'}
                avatarUrl={this.state.form.avatarUrl}
                email={this.state.form.email || 'juanc.guana@gmail.com'}
                jobTitle={this.state.form.jobTitle || 'Frontend developer'}
                twitter={this.state.form.twitter || 'juacguana'}
              />
            </div>
            <div className='col-6'>
              <h1>Edit Attendant</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;

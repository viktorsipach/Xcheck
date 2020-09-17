import React from 'react';
import { connect } from 'react-redux';
import { Button, PageHeader } from 'antd';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getCrossCheckSessions } from '../../../store/actions/cross-check-session';
import { getReviewRequests } from '../../../store/actions/review-requests';
import { getReviews } from '../../../store/actions/reviews';
import CrossCheckSessionsTableCreation from '../../../components/cross-check-sessions-table/cross-check-sessions-table-creation';
import mapData from '../../../components/cross-check-sessions-table/map-data';

class CrossCheckSessionsTable extends React.Component {
  componentDidMount() {
    const {
      getCrossCheckSessions,
      getReviewRequests,
      reviewRequestsData,
      reviewsData,
      getReviews,
    } = this.props;
    getCrossCheckSessions();
    if (reviewRequestsData.length === 0) {
      getReviewRequests();
    }
    if (reviewsData.length === 0) {
      getReviews();
    }
  }

  render() {
    const { crossCheckSessionsData } = this.props;
    const tableData = [];
    crossCheckSessionsData.forEach((session) => {
      tableData.push(mapData(session));
    });

    return (
      <div className="wrapper">
        <PageHeader className="site-page-header" title="CrossCheck Sessions" />
        <Button type="primary">
          <Link to="/cross-check-sessions/cross-check-session-form">Add new session</Link>
        </Button>
        <CrossCheckSessionsTableCreation tableData={tableData} />
      </div>
    );
  }
}

CrossCheckSessionsTable.propTypes = {
  crossCheckSessionsData: PropTypes.instanceOf(Array).isRequired,
  getCrossCheckSessions: PropTypes.func.isRequired,
  getReviewRequests: PropTypes.func.isRequired,
  reviewRequestsData: PropTypes.instanceOf(Object).isRequired,
  reviewsData: PropTypes.instanceOf(Object).isRequired,
  getReviews: PropTypes.func.isRequired,
};

const mapStateToProps = ({ crossCheckSessionsData, reviewRequestsData, reviewsData }) => {
  return {
    crossCheckSessionsData,
    reviewRequestsData,
    reviewsData,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCrossCheckSessions: () => dispatch(getCrossCheckSessions()),
    getReviewRequests: () => dispatch(getReviewRequests()),
    getReviews: () => dispatch(getReviews()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CrossCheckSessionsTable);

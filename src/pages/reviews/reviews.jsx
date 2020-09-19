import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { PageHeader, Button } from 'antd';
import history from '../../history/history';

import mapData from './mapData';
import { getReviews } from '../../store/actions/reviews';
import { getReviewRequests } from '../../store/actions/review-requests';
import ReviewsTable from '../../components/reviews-table';
import GradesTable from '../../components/grades-table';
import Feedback from '../../components/review-feedback';

class Reviews extends React.Component {
  state = {
    isReview: false,
    isCrossCheck: false,
    nameTask: '',
    review: {},
    dataGrades: [],
  };

  componentDidMount() {
    const { getReviews, getReviewRequests } = this.props;
    getReviews();
    getReviewRequests();
  }

  showReview = (record) => {
    history.push(`/reviews/${record.key}`);
    const dataGrades = this.getDataGrades(record.key);
    const review = this.getReview(record.key);
    this.setState({
      isReview: true,
      nameTask: record.taskTitle,
      dataGrades: [...dataGrades],
      review,
    });
  };

  hideReview = () => {
    history.push(`/reviews`);
    this.setState({
      isReview: false,
      isCrossCheck: false,
    });
  };

  getReview = (id) => {
    const { reviewsData } = this.props;
    let review;
    reviewsData.forEach((item) => {
      if (item.id === id) {
        review = item;
      }
    });
    return review;
  };

  showCrossCheckReview = (record) => {
    history.push(`/reviews/${record.key}`);
    const dataGrades = this.getDataGrades(record.key);
    const review = this.getDataCrossCheckReviews(record.key);
    this.setState({
      isCrossCheck: true,
      nameTask: record.taskTitle,
      dataGrades: [...dataGrades],
      review,
    });
  };

  getCrossCheckReviews = () => {
    const { reviewRequestsData, reviewsData } = this.props;
    const reviewRequests = reviewRequestsData.filter((item) => {
      const reviewRequest = item;
      let isTrue;
      let total = 0;
      reviewsData.forEach((item) => {
        if (item.requestId === reviewRequest.id && item.state === 'published') {
          isTrue = true;
          total += item.grade.total;
          reviewRequest.grade = total;
          reviewRequest.key = reviewRequest.id;
        }
      });
      return isTrue;
    });

    return reviewRequests;
  };

  getDataCrossCheckReviews = (id) => {
    const { reviewsData } = this.props;
    const crossCheckReviewsData = [];
    reviewsData.forEach((item) => {
      if (item.requestId === id && item.state === 'published') {
        crossCheckReviewsData.push(mapData(item));
      }
    });
    return crossCheckReviewsData;
  };

  getDataGrades = (id) => {
    const { reviewsData } = this.props;
    const gradesData = [];
    reviewsData.forEach((item) => {
      if (item.id === id) {
        gradesData.push(item.grade.items);
      }
    });
    return gradesData;
  };

  render() {
    const { reviewsData } = this.props;
    const { isReview, nameTask, dataGrades, review, isCrossCheck } = this.state;
    const reviews = [];
    reviewsData.forEach((review) => reviews.push(mapData(review)));
    const reviewRequests = this.getCrossCheckReviews();

    if (isReview) {
      return (
        <div className="wrapper">
          <PageHeader className="site-page-header" title={`${nameTask}`} />
          <Button onClick={() => this.hideReview()} type="primary">
            Back
          </Button>
          <GradesTable tableData={dataGrades} />
          <Feedback review={review} />
        </div>
      );
    }
    if (isCrossCheck) {
      return (
        <div className="wrapper">
          <PageHeader className="site-page-header" title={`${nameTask}`} />
          <Button onClick={() => this.hideReview()} type="primary">
            Back
          </Button>
          <ReviewsTable tableData={review} handleClick={this.showReview} />
        </div>
      );
    }
    return (
      <div className="wrapper">
        <PageHeader className="site-page-header" title="All reviews" />
        <ReviewsTable tableData={reviews} handleClick={this.showReview} />
        <PageHeader className="site-page-header" title="CrossCheck reviews" />
        <ReviewsTable tableData={reviewRequests} handleClick={this.showCrossCheckReview} />
      </div>
    );
  }
}

const mapStateToProps = ({ reviewsData, reviewRequestsData, login }) => {
  return { reviewsData, reviewRequestsData, login };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getReviews: () => dispatch(getReviews()),
    getReviewRequests: () => dispatch(getReviewRequests()),
  };
};

Reviews.propTypes = {
  reviewsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  reviewRequestsData: PropTypes.arrayOf(PropTypes.object).isRequired,
  getReviews: PropTypes.func.isRequired,
  getReviewRequests: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Reviews);

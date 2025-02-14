/*
 * This Source Code Form is subject to the terms of the Mozilla Public License,
 * v. 2.0. If a copy of the MPL was not distributed with this file, You can
 * obtain one at http://mozilla.org/MPL/2.0/. OpenMRS is also distributed under
 * the terms of the Healthcare Disclaimer located at http://openmrs.org/license.
 *
 * Copyright (C) OpenMRS Inc. OpenMRS is a registered trademark and the OpenMRS
 * graphic logo is a trademark of OpenMRS Inc.
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';

import './breadCrumb.css';

class BreadCrumb extends Component {
  constructor(props) {
    super(props);

    const { history } = this.props;
    this.state = {
      currentTab: history.location.pathname.toLowerCase(),
    };
  }

  componentWillMount() {
    const { history } = this.props;
    history.listen((location) => {
      const currentTab = location.pathname.toLowerCase();
      this.setState({
        currentTab,
      });
    });
  }


  render() {
    const {
      currentTab,
    } = this.state;
    let familyName = '';
    const { patientHeaderDetail, history } = this.props;
    if (typeof patientHeaderDetail !== 'undefined' && patientHeaderDetail.hasOwnProperty('person')) {
      familyName = patientHeaderDetail.person.personName.familyName;
    }
    let outputBreadcrumb;

    const homePageBreadcrumb = (
      <span>
        <Link to="/">
          <span
            className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
            aria-hidden="true" />
          <span className="title breadcrumb-item">
            <u>
            Labs
            </u>
          </span>
        </Link>
      </span>
    );

    switch (currentTab) {
      case '/labresultentry':
        outputBreadcrumb = (
          <span>
            <span>{ homePageBreadcrumb }</span>
            <Link to="LabResultEntry">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                {familyName || ''}
                {' '}
Lab Result
              </span>
            </Link>
          </span>
        );
        break;

      case '/labresults': {
        const returnUrl = localStorage.getItem('returnUrl');
        outputBreadcrumb = (
          <span>
            <a href={returnUrl}>
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                <u>{familyName}</u>
              </span>
            </a>
            <Link to="labresults">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                Labs
              </span>
            </Link>
          </span>
        );
      }
        break;

      case '/labtrends': {
        let trendDisplay = "...";
        if (history.location.state) {
          trendDisplay = history.location.state.display;
        }
        const returnUrl = localStorage.getItem('returnUrl');
        outputBreadcrumb = (
          <span>
            <a href={returnUrl}>
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                <u>{familyName}</u>
              </span>
            </a>
            <Link to="labresults">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                <u>Labs</u>
              </span>
            </Link>
            <Link to="labresults">
              <span
                className="glyphicon glyphicon-chevron-right breadcrumb-item separator"
                aria-hidden="true" />
              <span className="title breadcrumb-item">
                {`${trendDisplay} Trend`}
              </span>
            </Link>
          </span>
        );
      }
        break;

      default:
        outputBreadcrumb = homePageBreadcrumb;
    }

    return (
      <div className="breadcrumb">
        <a href="../../" className="breadcrumb-item">
          <span className="glyphicon glyphicon-home breadcrumb-item" aria-hidden="true" />
        </a>
        { outputBreadcrumb }
      </div>
    );
  }
}

BreadCrumb.propTypes = {
  history: PropTypes.shape({}).isRequired,
  patientHeaderDetail: PropTypes.shape({}),
};

const mapStateToProps = ({
  patients,
  selectedPatient,
}) => ({
  patientHeaderDetail: patients[selectedPatient],
});


export default withRouter(connect(mapStateToProps)(BreadCrumb));

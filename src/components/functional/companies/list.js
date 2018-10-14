import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { List, Card, Button } from 'antd'
import { Link } from 'react-router-dom'

class CompaniesList extends Component {
  componentDidMount () {
    this.props.fetchCompanies()
  }

  loadMoreButtonNode = () => {
    if (this.props.totalPages === this.props.currentPage || this.props.companiesUI.fetching) return false

    return <Button onClick={() => this.handleUpdateCurrentPage()} disabled={this.props.companiesUI.fetching}>Load more</Button>
  }

  handleUpdateCurrentPage = () => {
    this.props.updateCurrentPage(this.props.currentPage + 1)
    this.props.fetchCompanies()
  }

  componentWillUnmount = () => {
    this.props.resetCompanies()
  }

  render () {
    return (
      <List
        loading={this.props.companiesUI.fetching}
        grid={{ gutter: 16, xs: 1, sm: 1, md: 1, lg: 2, xl: 2, xxl: 3 }}
        dataSource={this.props.companies}
        loadMore={this.loadMoreButtonNode()}
        renderItem={item => (
          <List.Item>
            <Link to={`/companies/${item.id}`}>
              <Card title={item.name} hoverable bordered={false}>
                {item.name}
              </Card>
            </Link>
          </List.Item>
        )}
      />
    )
  }
}

CompaniesList.propTypes = {
  companiesUI: PropTypes.object,
  fetchCompanies: PropTypes.func.isRequired,
  resetCompanies: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired
}

export default CompaniesList

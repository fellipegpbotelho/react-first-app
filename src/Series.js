import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Watched',
    'watching': 'Watching',
    'toWatch': 'To watch'
}

class Series extends Component {

    //
    constructor(props) {
        super(props)
        this.state = {
            isLoading: false,
            series: []
        }
        this.renderSeries = this.renderSeries.bind(this)
        this.loadData = this.loadData.bind(this)
    }

    //
    componentDidMount() {
        this.loadData()
    }

    loadData() {
        this.setState({ isLoading: true })
        api
            .loadSeriesByGenre(this.props.match.params.genre)
            .then((res) => {
                this.setState({
                    isLoading: false,
                    series: res.data
                })
            })
    }

    //
    deleteSeries(id) {
        api
            .deleteSeries(id)
            .then((res) => this.loadData())
    }

    //
    renderSeries(series) {
        return (
            <div key={series.id} className="item  col-xs-4 col-lg-4">
              <div className="thumbnail">
                <img className="group list-group-image" src="http://placehold.it/400x250/000/fff" alt="" />
                <div className="caption">
                    <h4 className="group inner list-group-item-heading">
                        { series.name }
                    </h4>
                  <div className="row">
                    <div className="col-xs-12 col-md-6">
                        <p className="lead">
                            { series.genre } / { statuses[series.status] }
                        </p>
                    </div>
                    <br />
                    <div className="col-xs-12 col-md-6">
                      <Link className="btn btn-success" to={ `/series-edit/${series.id}` }>Edit</Link>
                      <a className="btn btn-danger" onClick={ () => this.deleteSeries(series.id) }>Delete</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        )
    }

    //
    render() {
        return (
            <section id="intro" className="intro-section">
                <div className="container">
                    <h1>Series - { this.props.match.params.genre }</h1>
                    <div id="series" className="row list-group">
                        {
                            this.state.isLoading &&
                            <p>Carregando, aguarde...</p>
                        }
                        {
                            ! this.state.isLoading && this.state.series.length === 0 &&
                            <div className="alert alert-warning">Nenhuma série cadastrada...</div>
                        }
                        {
                            ! this.state.isLoading &&
                              this.state.series.map(this.renderSeries)
                        }
                    </div>
                </div>
            </section>
        )
    }
}

export default Series

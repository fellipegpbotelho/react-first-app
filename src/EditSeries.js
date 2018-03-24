import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Watched',
    'watching': 'Watching',
    'toWatch': 'To watch'
}

class EditSeries extends Component {

    //
	constructor(props) {
		super(props)
		this.state = {
            isLoading: false,
            redirect: false,
			genres: [],
            series: {}
		}
        this.saveSeries = this.saveSeries.bind(this)
	}

    //
	componentDidMount() {
		this.setState({ isLoading: true })
        api
            .loadSeriesById(this.props.match.params.id)
            .then((res) => {
                this.setState({ series: res.data })
                this.refs.name.value = this.state.series.name
                this.refs.genre.value = this.state.series.genre
                this.refs.comments.value = this.state.series.comments
                this.refs.status.value = this.state.series.status
            })
		api
            .loadGenres()
			.then((res) => {
				this.setState({
					isLoading: false,
					genres: res.data
				})
			})
	}

    saveSeries() {
        const newSeries = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }
        api
            .updateSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: `/series/${this.refs.genre.value}`
                })
            })
    }

    //
    render() {
        return (
            <section className="intro-section">
                {
                    this.state.redirect &&
                    <Redirect to={this.state.redirect} />
                }
                <div className="container text-left">
                    <h1>Edit Serie</h1>
                    <p>{ JSON.stringify(this.state) }</p>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Name: </label>
                            <input type="text" className="form-control" ref="name" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status: </label>
                            <select className="form-control" ref="status">
                                {
                                    Object
                                        .keys(statuses)
                                        .map(
                                            key => <option key={ key } value={ key }>{ statuses[key] }</option>
                                        )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Genre: </label>
                            <select className="form-control" ref="genre">
                                {
                                    this
                                        .state
                                        .genres
                                        .map(
                                            key => <option key={ key } value={ key }>{ key }</option>
                                        )
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="control-label">Comments: </label>
                            <textarea className="form-control" ref="comments"></textarea>
                        </div>
                        <button type="button" className="btn btn-default" onClick={ this.saveSeries }>Save</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default EditSeries

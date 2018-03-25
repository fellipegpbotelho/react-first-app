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
                // this.setState({ series: res.data })
                this.refs.name.value = res.data.name
                this.refs.comments.value =  res.data.comments
                this.refs.status.value =  res.data.status
                setTimeout(() => {
                    this.refs.genre.value =  res.data.genre
                }, 500)
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

        const serie = {
            id: this.props.match.params.id,
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genre.value,
            comments: this.refs.comments.value
        }

        api
            .updateSeries(serie)
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
                    <Redirect to={ this.state.redirect } />
                }
                <div className="container text-left">
                    <h1>Edit Series</h1>
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
                                            (key) => <option key={ key } value={ key }>{ key }</option>
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

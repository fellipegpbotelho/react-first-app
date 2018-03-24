import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import api from './Api'

const statuses = {
    'watched': 'Watched',
    'watching': 'Watching',
    'toWatch': 'To watch'
}

class NewSeries extends Component {

    //
	constructor(props) {
		super(props)
		this.state = {
            isLoading: false,
            redirect: false,
			genres: [],
		}
        this.saveSeries = this.saveSeries.bind(this)
	}

    //
	componentDidMount() {
		this.setState({ isLoading: true })
		api.loadGenres()
			.then((res) => {
				this.setState({
					isLoading: false,
					genres: res.data
				})
			})
	}

    saveSeries() {
        const newSeries = {
            name: this.refs.name.value,
            status: this.refs.status.value,
            genre: this.refs.genrer.value,
            comments: this.refs.comments.value
        }
        api
            .saveSeries(newSeries)
            .then((res) => {
                this.setState({
                    redirect: `/series/${this.refs.genrer.value}`
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
                    <h1>New Serie</h1>
                    <form>
                        <div className="form-group">
                            <label className="control-label">Name: </label>
                            <input key="name" type="text" className="form-control" ref="name" />
                        </div>
                        <div className="form-group">
                            <label className="control-label">Status: </label>
                            <select key="status" className="form-control" ref="status">
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
                            <label className="control-label">Genrer: </label>
                            <select key="genrer" className="form-control" ref="genrer">
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
                            <textarea key="comments" className="form-control" ref="comments"></textarea>
                        </div>
                        <button type="button" className="btn btn-default" onClick={ this.saveSeries }>Save</button>
                    </form>
                </div>
            </section>
        )
    }
}

export default NewSeries

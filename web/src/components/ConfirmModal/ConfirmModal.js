import React from 'react'
import ConfirmDialog from './ConfirmDialog'

// This confirmation dialog is mainly copied from https://itnext.io/add-confirmation-dialog-to-react-events-f50a40d9a30d

class ConfirmModal extends React.PureComponent {
    static propTypes = {
        // none
    }
    static defaultProps = {
        // none
    }
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            title: '',
            description: '',
            callback: null,
        }
        this.confirm = this.confirm.bind(this)
        this.cancel = this.cancel.bind(this)
        this.confirmed = this.confirmed.bind(this)
    }
    // this is called when the child component called confirm() to popup the confirm dialog and wait for user's input
    confirm(callback, title, description) {
        return (...args) => {
            // note: first argument must be the component's triggered event (e.g. button)
            const [ event ] = args
            event.preventDefault()
            event.stopPropagation()
            event.persist()
            this.setState({
                open: true,
                title,
                description,
                callback: () => callback(...args),
            })
        }
    }
    // cancel confirm dialog
    cancel(event) {
        if ((event) && (event.stopPropagation)) {
            event.stopPropagation()
        }
        this.setState({
            open: false,
            callback: null,
        })
    }
    // user confirmed OK, proceed by invoking the callback function
    confirmed(event) {
        this.state.callback()
        this.cancel(event)
    }
    render() {
        const { children } = this.props
        const { open, title, description } = this.state
        return (
            <>
                {children(this.confirm)}
                <ConfirmDialog
                    open={open}
                    title={title}
                    onOk={this.confirmed}
                    onCancel={this.cancel}
                >
                    {description}
                </ConfirmDialog>
            </>
        )
    }
}

export default ConfirmModal

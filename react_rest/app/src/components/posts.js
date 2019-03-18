import React, { Component } from "react";
import { Modal, Button, ButtonToolbar } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }
  modalClose = () => {
    this.setState({ modalShow: false });
  };

  render() {
    let { posts } = this.props;
    return (
      <div className="post-lista">
        {posts.length < 1 ? (
          <FontAwesomeIcon className="spinner_loco" icon="spinner" />
        ) : (
          <div>
            <Modal
              show={this.state.modalShow}
              onHide={this.modalClose}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
            >
              <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                  Modal heading
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                  Cras mattis consectetur purus sit amet fermentum. Cras justo
                  odio, dapibus ac facilisis in, egestas eget quam. Morbi leo
                  risus, porta ac consectetur ac, vestibulum at eros.
                </p>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={this.props.onHide}>Close</Button>
              </Modal.Footer>
            </Modal>
            <ButtonToolbar>
              <Button
                variant="primary"
                onClick={() => this.setState({ modalShow: true })}
              >
                Launch vertically centered modal
              </Button>
            </ButtonToolbar>
          </div>
        )}
      </div>
    );
  }
}

export { Posts };

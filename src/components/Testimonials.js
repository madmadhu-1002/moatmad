import { Container, Row, Col } from 'react-bootstrap';
import styles from '@/styles/Products.module.css'

const Testimonials = ({data}) => {
  return (
    <>
    {data &&
        <Container fluid className={`mb-5 ${styles.testimonials}`} >
          <Row>
            <div className={`mt-5 mb-4 ${styles.productsHeading}`}>
              <h1>Testimonials</h1>
            </div>
            <Container fluid>
              <Row className={styles.testMon} style={{ marginRight: "0%" }}>
                {data.map((item, index) => {
                  return (
                    <Col lg={4} md={6} key={item.id || index}>
                      <div key={index}  className=' p-3'>
                                    <div className={`card ${styles.testimonialCards}`} >
                                        <div className={styles.newPost}>
                                            <span>
                                                <img src="https://i.imgur.com/i06xx2I.png" className={styles.quoteImg} alt="quote" />
                                            </span>
                                            <div className={styles.postTxt} dangerouslySetInnerHTML={{ __html: item.message_en }} />
                                        </div>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "center" }}>
                                        <div className={styles.arrowDown}></div>
                                    </div>
                                    <div className="row d-flex justify-content-center">
                                        <p className={styles.profileName}>{item.name_en}</p>
                                    </div>
                                </div>
                      </Col>
                  )
                })}
              </Row>
            </Container>
          </Row>

        </Container>}
    </>
  )
}

export default Testimonials
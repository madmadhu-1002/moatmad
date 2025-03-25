"use client"

import { Col, Container, Row, Card } from 'react-bootstrap';
import styles from '@/styles/PaperWork.module.css'

const CarRating = ({data}) => {
  return (
    <Container fluid className="mb-5 ps-5">

            <div className='mt-5  '>
              <h1 className='text-center mb-4' style={{ fontWeight: '700',fontSize:"28px" }}>{data.category_title_en}</h1>
                {data && data?.highlight_en && <div style={{ marginBottom: "0px" }}  className="m-5 text-center" dangerouslySetInnerHTML={{ __html: data.highlight_en }} />}

            </div>

            <h3 className='text-center mb-2' style={{ fontWeight: '700' }}>{data && data.sub_category_title_en}
            </h3>


            <Row className={styles.insidePageCardsRow}>


              {data && data.sections.map((item, index) => {
                return (
                  <Col lg={3} key={item.id || index}>
                    <Card >
                      <Card.Body>
                        <div className='d-flex justify-content-center'>
                        <img src={item.icon_file_or_image} />
                        </div>
                        
                        <Card.Title>{item.section_title_en}</Card.Title>
                        
                        <div className="m-0 card-text" dangerouslySetInnerHTML={{ __html: item.description_en }} />
                        
                      </Card.Body>
                    </Card>
                  </Col>

                )
              })}
            </Row>
          </Container>
  )
}

export default CarRating
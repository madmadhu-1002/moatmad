"use client"

import { Col, Container, Row, Card } from 'react-bootstrap'

const PaperWork = ({data}) => {
  return (
    <Container fluid className='buyer-gaide-page mb-5'>


        <div className='mt-5 mb-5 products-heading'>
          <h1>{data && data.category_title_en}</h1>
        </div>




        <Row className='inside-page-cards-row'>

          {data && data.sections.map((item, index) => {
            return (
              <Col lg={3} key={item.id || index}>
                <Card >
                  <Card.Body className=''>
                    <div className='w-100 d-flex justify-content-center'>
                    <img src={item.icon_file_or_image} />
                    </div>
                    
                    <Card.Title>{item.section_title_en}</Card.Title>
                      <div style={{ marginBottom: "0px" }} dangerouslySetInnerHTML={{ __html: item.description_en }} />
                  </Card.Body>
                </Card>
              </Col>

            )
          })}


        </Row>




      </Container>
  )
}

export default PaperWork


import { Col, Container, Row, Card } from 'react-bootstrap';

const UsedCarInTests = ({data}) => {
  return (
    <>
    {data && <Container fluid className='buyer-gaide-page mb-5'>
            <Row>
              <div className='mt-5 mb-4 '>
                <h1 className='text-center mb-4' style={{ fontWeight: "700" ,fontSize:'28px'}}>{data.category_title_en}</h1>
                
                <div style={{ marginBottom: "0px" }} dangerouslySetInnerHTML={{ __html: data.highlight_en }} />
              </div>
              {data.sections?.map((item, index) => {
                return (
                  item.section_title_en &&
                  <h1 key={`title-${index}`} className='text-center mb-4' style={{ fontWeight: "700",fontSize:'24px' }}>{item.section_title_en}</h1>

                )
              })}


              <Col lg={12}>


                {data.sections.map((item, index) => {
                  return (
                    item.section_title_en &&
                    <div key={`desc-${index}`} className="m-5" dangerouslySetInnerHTML={{ __html: item.description_en }} />

                  )
                })}

              </Col>



            </Row>
          </Container>}
    </>
  )
}

export default UsedCarInTests
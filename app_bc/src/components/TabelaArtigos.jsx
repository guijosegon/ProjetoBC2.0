import React, { useEffect, useState } from "react";
import { Button, Card, Col, Input, Row, Table, Tooltip } from "antd";
import { EditOutlined, SearchOutlined } from '@ant-design/icons';
import Detalhes from "@/pages/admin/artigos/Detalhes";
import { format } from "date-fns";

function TabelaArtigos({ artigos, onFilterChange, onArtigosChange }) {
  const [filtro, setFiltro] = useState();
  const columns = [
    {
      title: 'Titulo',
      dataIndex: 'titulo',
      key: "titulo",
      width: 300,
    },
    {
      title: 'Autor',
      dataIndex: 'autor',
      key: 'autor'
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 90,
    },
    {
      title: 'Publicação',
      dataIndex: 'publicacao',
      key: 'publicacao',
      width: 90,
      render: (publicacao) => (
        format(new Date(publicacao), 'dd/MM/yyyy')
      )
    },
    {
      title: '',
      align: 'center',
      dataIndex: '',
      key: '',
      width: 90,
      render: (_, row) => (
        <Row>
          <Col span={12}>
            <Detalhes artigo={row}
              onArtigosChange={onArtigosChange}>
              <Tooltip title='Editar'>
                <Button icon={<EditOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
          <Col span={12}>
            <Detalhes artigo={row} consulta={true}>
              <Tooltip title='Consultar'>
                <Button icon={<SearchOutlined />} />
              </Tooltip>
            </Detalhes>
          </Col>
        </Row>
      )
    }
  ];  

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onFilterChange(filtro);
    }, 1000);
    return () => clearTimeout(timeoutId);
  }, [filtro]);

  return (
    <Card title={'Tabela Artigos'}>
      <Row gutter={[10, 10]}
        justify={'end'}>
        <Col span={20}>
          <Input value={filtro}
            placeholder="Pesquisar por chave..."
            onChange={({ target: { value } }) => setFiltro(value)}
            suffix={<SearchOutlined />} />
        </Col>
        <Col span={4}>
          <Detalhes onArtigosChange={onArtigosChange}>
            <Button type="primary"
              block>
              Cadastrar
            </Button>
          </Detalhes>
        </Col>
        <Col span={24}>
          <Table size="small"
            columns={columns}
            dataSource={artigos}
            bordered
            onChange={onArtigosChange}
            pagination={false} />
        </Col>
      </Row>
    </Card>
  )
}

export default TabelaArtigos;
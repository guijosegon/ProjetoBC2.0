import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Card, Row, Col, Typography, Divider, Button, Input, message } from 'antd';
import { HeartOutlined } from '@ant-design/icons';
import axios from "axios";
import NavHome from '@/components/NavHome';
import { format } from 'date-fns';

const { Title, Text } = Typography;

const Artigo = () => {
  const [artigo, setArtigo] = useState();
  const [mensagem, contextHolder] = message.useMessage();
  const router = useRouter();

  useEffect(() => {
    const { _id, autor, conteudo, status, titulo, chave, curtidas, publicacao } = router.query;
    setArtigo({ _id, autor, conteudo, status, titulo, chave, curtidas, publicacao });
  }, [router.query]);

  const handleCurtir = async () => {
    try {
      const updateArtigo = await axios.put(`http://localhost:4000/article/curtir/${artigo._id}`, { ...artigo });
      mensagem.open({
        type: 'success',
        content: "Artigo curtido com sucesso!",
      });
      setArtigo(updateArtigo.data)
    } catch (error) {
      mensagem.open({
        type: 'error',
        content: "Erro ao curtir o Artigo!",
      });
    }
  };

  return (
    <>
      {contextHolder}
      <Head>
        <title>APP-BC</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <NavHome />
      </div>
      <Card title="Artigo"
        style={{
          width: 1250,
          margin: 'auto',
          marginTop: 10,
        }}>
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <Title level={2}>{artigo?.titulo}</Title>
          </Col>
          <Col span={24}>
            <Text strong>Data de Publicação:</Text> {artigo?.publicacao ? format(new Date(artigo?.publicacao), 'dd/MM/yyyy') : ''}
          </Col>
          <Col span={24}>
            <Text strong>Autor:</Text> {artigo?.autor}
          </Col>
          <Col span={24}>
            <Text strong>Conteúdo:</Text>
            <Divider />
            <Text>{artigo?.conteudo}</Text>
            <Divider />
          </Col>
          <Col span={20}>
            <Text strong>Key(s):</Text> {artigo?.chave}
          </Col>
          <Col span={4}>
            <Row gutter={[10, 10]}>
              <Col span={10}>
                <Input value={artigo?.curtidas}
                  disabled={true} />
              </Col>
              <Col span={14}>
                <Button type={'dashed'}
                  onClick={handleCurtir}
                  icon={<HeartOutlined style={{ color: 'red' }} />} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </>
  );
};

export default Artigo;

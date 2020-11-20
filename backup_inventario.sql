--
-- PostgreSQL database dump
--

-- Dumped from database version 13.1 (Debian 13.1-1.pgdg100+1)
-- Dumped by pg_dump version 13.1 (Debian 13.1-1.pgdg100+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: factura; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.factura (
    "idFactura" integer NOT NULL,
    "numeroFactura" numeric,
    "conceptoFactura" text,
    "totalFactura" numeric,
    "fechaCreacion" date
);


ALTER TABLE public.factura OWNER TO pg;

--
-- Name: factura_idFactura_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

CREATE SEQUENCE public."factura_idFactura_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."factura_idFactura_seq" OWNER TO pg;

--
-- Name: factura_idFactura_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg
--

ALTER SEQUENCE public."factura_idFactura_seq" OWNED BY public.factura."idFactura";


--
-- Name: trazabilidad; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.trazabilidad (
    idtrazabilidad integer NOT NULL,
    idfactura numeric,
    idusuario numeric,
    evento character varying(150),
    fechaevento timestamp without time zone
);


ALTER TABLE public.trazabilidad OWNER TO pg;

--
-- Name: trazabilidad_idtrazabilidad_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

CREATE SEQUENCE public.trazabilidad_idtrazabilidad_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trazabilidad_idtrazabilidad_seq OWNER TO pg;

--
-- Name: trazabilidad_idtrazabilidad_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg
--

ALTER SEQUENCE public.trazabilidad_idtrazabilidad_seq OWNED BY public.trazabilidad.idtrazabilidad;


--
-- Name: usuarios; Type: TABLE; Schema: public; Owner: pg
--

CREATE TABLE public.usuarios (
    idusuario integer NOT NULL,
    "nombreUsuario" character varying(50),
    correo character varying(50),
    password character varying(200)
);


ALTER TABLE public.usuarios OWNER TO pg;

--
-- Name: usuarios_idusuario_seq; Type: SEQUENCE; Schema: public; Owner: pg
--

CREATE SEQUENCE public.usuarios_idusuario_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.usuarios_idusuario_seq OWNER TO pg;

--
-- Name: usuarios_idusuario_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: pg
--

ALTER SEQUENCE public.usuarios_idusuario_seq OWNED BY public.usuarios.idusuario;


--
-- Name: factura idFactura; Type: DEFAULT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.factura ALTER COLUMN "idFactura" SET DEFAULT nextval('public."factura_idFactura_seq"'::regclass);


--
-- Name: trazabilidad idtrazabilidad; Type: DEFAULT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.trazabilidad ALTER COLUMN idtrazabilidad SET DEFAULT nextval('public.trazabilidad_idtrazabilidad_seq'::regclass);


--
-- Name: usuarios idusuario; Type: DEFAULT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.usuarios ALTER COLUMN idusuario SET DEFAULT nextval('public.usuarios_idusuario_seq'::regclass);


--
-- Data for Name: factura; Type: TABLE DATA; Schema: public; Owner: pg
--

COPY public.factura ("idFactura", "numeroFactura", "conceptoFactura", "totalFactura", "fechaCreacion") FROM stdin;
4	1	cafe	2222	2020-10-10
7	2	cafe	2222	2020-10-10
8	2	cafe	2222	2020-10-10
9	8	bateria	2222	2020-10-10
10	9	bateria	2222	2020-10-10
11	10	bateria	2222	2020-10-10
12	10	bateria	2222	2020-10-10
14	10	bateria	2222	2020-10-10
17	10	bateria	2222	2020-10-10
18	10	bateria	2222	2020-10-10
19	10	bateria	2222	2020-10-10
20	10	bateria	2222	2020-10-10
21	10	bateria	2222	2020-10-10
22	10	bateria	2222	2020-10-10
23	10	bateria	2222	2020-10-10
24	10	bateria	2222	2020-10-10
25	10	bateria	2222	2020-10-10
6	2	cafe con leche 2	33333333333	2020-10-10
13	2	cafe con leche 2	33333333333	2020-10-10
26	101	cargadores	2222	2020-10-10
27	102	cargadores	2222	2020-10-10
\.


--
-- Data for Name: trazabilidad; Type: TABLE DATA; Schema: public; Owner: pg
--

COPY public.trazabilidad (idtrazabilidad, idfactura, idusuario, evento, fechaevento) FROM stdin;
1	\N	5	consultando factura	2020-11-17 18:44:45.191
2	15	5	eliminando factura	2020-11-17 18:45:18.132
3	16	5	eliminando factura	2020-11-17 18:45:23.94
4	13	5	modificar factura	2020-11-17 18:45:36.135
5	13	5	modificar factura	2020-11-17 18:45:44.321
6	11	5	consultando factura	2020-11-17 18:47:56.664
7	12	5	consultando factura	2020-11-17 18:48:01.997
8	26	5	ingresando factura	2020-11-17 18:50:04.084
9	\N	5	consultando facturas	2020-11-17 19:05:48.038
10	3	5	eliminando factura	2020-11-17 19:06:16.861
11	27	5	ingresando factura	2020-11-17 19:06:53.592
\.


--
-- Data for Name: usuarios; Type: TABLE DATA; Schema: public; Owner: pg
--

COPY public.usuarios (idusuario, "nombreUsuario", correo, password) FROM stdin;
5	laura	laura@gmail	$2a$10$9sXM3igY5wQC9A0saqBVtO/hscxNE9i4F5q08DzIQGwZ5A4tkr7r2
6	laurados	laura@gmail.com	$2a$10$9sXM3igY5wQC9A0saqBVtOy9if5I8lzoXW2n2LzuvtbKlyns7R732
7	lauratres	lauratres@gmail.com	$2a$10$9sXM3igY5wQC9A0saqBVtOy9if5I8lzoXW2n2LzuvtbKlyns7R732
8	lauracuatro	lauracuatro@gmail.com	$2a$10$9sXM3igY5wQC9A0saqBVtOy9if5I8lzoXW2n2LzuvtbKlyns7R732
\.


--
-- Name: factura_idFactura_seq; Type: SEQUENCE SET; Schema: public; Owner: pg
--

SELECT pg_catalog.setval('public."factura_idFactura_seq"', 27, true);


--
-- Name: trazabilidad_idtrazabilidad_seq; Type: SEQUENCE SET; Schema: public; Owner: pg
--

SELECT pg_catalog.setval('public.trazabilidad_idtrazabilidad_seq', 11, true);


--
-- Name: usuarios_idusuario_seq; Type: SEQUENCE SET; Schema: public; Owner: pg
--

SELECT pg_catalog.setval('public.usuarios_idusuario_seq', 8, true);


--
-- Name: trazabilidad Trazabilidad_pkey; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.trazabilidad
    ADD CONSTRAINT "Trazabilidad_pkey" PRIMARY KEY (idtrazabilidad);


--
-- Name: factura factura_pkey; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.factura
    ADD CONSTRAINT factura_pkey PRIMARY KEY ("idFactura");


--
-- Name: usuarios usuarios_pkey; Type: CONSTRAINT; Schema: public; Owner: pg
--

ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (idusuario);


--
-- PostgreSQL database dump complete
--


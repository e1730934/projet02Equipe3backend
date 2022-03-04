USE Essai
GO
ALTER TABLE [dbo].[IPPE] DROP CONSTRAINT [FK_IPPE_Personnes]
GO
ALTER TABLE [dbo].[FPS] DROP CONSTRAINT [FK_FPS_Personnes]
GO
ALTER TABLE [dbo].[Conditions] DROP CONSTRAINT [FK_Conditions_Conditions]
GO
/****** Object:  Index [UQ__Utilisat__DD380E4FCDE609CB]    Script Date: 2022-03-04 12:37:27 ******/
ALTER TABLE [dbo].[Utilisateurs] DROP CONSTRAINT [UQ__Utilisat__DD380E4FCDE609CB]
GO
/****** Object:  Index [UQ__FPS__3AFC04232AF8A589]    Script Date: 2022-03-04 12:37:27 ******/
ALTER TABLE [dbo].[FPS] DROP CONSTRAINT [UQ__FPS__3AFC04232AF8A589]
GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Utilisateurs]') AND type in (N'U'))
DROP TABLE [dbo].[Utilisateurs]
GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Personnes]') AND type in (N'U'))
DROP TABLE [dbo].[Personnes]
GO
/****** Object:  Table [dbo].[IPPE]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IPPE]') AND type in (N'U'))
DROP TABLE [dbo].[IPPE]
GO
/****** Object:  Table [dbo].[IBVA]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBVA]') AND type in (N'U'))
DROP TABLE [dbo].[IBVA]
GO
/****** Object:  Table [dbo].[IBOB]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBOB]') AND type in (N'U'))
DROP TABLE [dbo].[IBOB]
GO
/****** Object:  Table [dbo].[IBAF]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBAF]') AND type in (N'U'))
DROP TABLE [dbo].[IBAF]
GO
/****** Object:  Table [dbo].[FPS]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FPS]') AND type in (N'U'))
DROP TABLE [dbo].[FPS]
GO
/****** Object:  Table [dbo].[Conditions]    Script Date: 2022-03-04 12:37:27 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Conditions]') AND type in (N'U'))
DROP TABLE [dbo].[Conditions]
GO
/****** Object:  Table [dbo].[Conditions]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conditions](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdIPPE] [int] NOT NULL,
	[Libelle] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_Conditions] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FPS]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FPS](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPersonne] [int] NOT NULL,
	[NoFPS] [nchar](7) NOT NULL,
	[DateMesure] [datetime] NOT NULL,
	[CD] [nvarchar](50) NOT NULL,
	[Antecedents] [varchar](150) NOT NULL,
	[Violent] [bit] NULL,
	[Echappe] [bit] NULL,
	[Suicidaire] [bit] NULL,
	[Desequilibre] [bit] NULL,
	[Contagieux] [bit] NULL,
 CONSTRAINT [PK_FPS] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBAF]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBAF](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[Description] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_IBAB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBOB]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBOB](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[Description] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_IBOB] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBVA]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBVA](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NULL,
	[Titre] [nvarchar](50) NULL,
	[Auteur] [nvarchar](50) NULL,
	[Inscription] [nvarchar](50) NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[Description] [nvarchar](150) NOT NULL,
 CONSTRAINT [PK_IBVA] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IPPE]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IPPE](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[IdPersonne] [int] NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[TypeEvenement] [nvarchar](30) NOT NULL,
	[Raison] [nvarchar](100) NULL,
	[DossierEnquete] [nchar](15) NULL,
	[Cour] [nvarchar](30) NULL,
	[NoCour] [nvarchar](20) NULL,
	[NatureCrime] [nvarchar](150) NULL,
	[LieuDetention] [nvarchar](30) NULL,
	[FinSentence] [datetime] NULL,
	[VuDerniereFois] [nvarchar](100) NULL,
	[Agent] [nvarchar](150) NULL,
	[Telephone] [nchar](10) NULL,
	[Poste] [nvarchar](6) NULL,
 CONSTRAINT [PK_IPPE] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personnes](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[NomFamille] [nvarchar](50) NOT NULL,
	[Prenom1] [nvarchar](50) NOT NULL,
	[Prenom2] [nvarchar](50) NULL,
	[Masculin] [bit] NOT NULL,
	[DateNaissance] [datetime] NOT NULL,
	[Telephone] [nchar](10) NULL,
	[NoPermis] [nchar](13) NULL,
	[Adresse1] [nvarchar](50) NULL,
	[Adresse2] [nvarchar](50) NULL,
	[Ville] [nvarchar](50) NULL,
	[Province] [nvarchar](50) NULL,
	[CodePostal] [nchar](7) NULL,
	[Race] [nvarchar](10) NULL,
	[Taille] [int] NULL,
	[Poids] [int] NULL,
	[Yeux] [nvarchar](15) NULL,
	[Cheveux] [nvarchar](15) NULL,
	[Marques] [nvarchar](100) NULL,
	[Toxicomanie] [bit] NULL,
	[Desorganise] [bit] NULL,
	[Depressif] [bit] NULL,
	[Suicidaire] [bit] NULL,
	[Violent] [bit] NULL,
	[Gilet] [nvarchar](50) NULL,
	[Pantalon] [nvarchar](50) NULL,
	[AutreVetement] [nvarchar](50) NULL,
 CONSTRAINT [PK_Personnes] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 2022-03-04 12:37:27 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilisateurs](
	[Id] [int] IDENTITY(1,1) NOT NULL,
	[Identifiant] [nvarchar](8) NOT NULL,
	[MotDePasse] [nvarchar](max) NOT NULL,
	[Etudiant] [bit] NOT NULL,
	[NomFamille] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Utilisateurs] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Conditions] ON 
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (1, 3, N'Ne pas entrer en contact avec Julie Lapierre.')
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (2, 4, N'Ne pas entrer en contact avec Alain Coutu')
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (3, 4, N'Aucune consommation d alcool ou de drogue non prescrite')
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (4, 5, N'Ne pas fréquenter des gens ayant des dossiers criminels')
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (5, 5, N'Aucune consommation d alcool ou de drogue non prescrite')
GO
INSERT [dbo].[Conditions] ([Id], [IdIPPE], [Libelle]) VALUES (6, 8, N'Ne pas entrer en contact avec Julie Lapierre.')
GO
SET IDENTITY_INSERT [dbo].[Conditions] OFF
GO
SET IDENTITY_INSERT [dbo].[FPS] ON 
GO
INSERT [dbo].[FPS] ([Id], [IdPersonne], [NoFPS], [DateMesure], [CD], [Antecedents], [Violent], [Echappe], [Suicidaire], [Desequilibre], [Contagieux]) VALUES (2, 6, N'438761F', CAST(N'2020-02-25T00:00:00.000' AS DateTime), N'W08,W03,W08,W08,W07,W07,W01,W06,W03,U08', N'Tentative de meurtre', 1, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[FPS] OFF
GO
SET IDENTITY_INSERT [dbo].[IPPE] ON 
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (1, 2, N'108-220208-0031', N'Recherché', N'Arrestation', NULL, N'Municipale de Longueuil', N'CM-LGL-A-26840', N'Agression armée', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (2, 3, N'302-220131-0056', N'Sous observation', N'Fréquentation criminelle', N'LVL-RENS-468259', NULL, NULL, N'Fraude et prêts usuraires', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (3, 4, N'123-220115-0014', N'Accusé', NULL, NULL, N'Municipale de Montréal', N'CM- MTL-57931-852', N'Voies de fait', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (4, 5, N'123-200303-0026', N'Probation', NULL, NULL, N'Municipale de Montréal', N'CM- MTL-58246-829', N'Intimidation', NULL, CAST(N'2022-03-01T00:00:00.000' AS DateTime), NULL, N'David Chapdelaine', N'5142547131', N'222')
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (5, 6, N'108-110525-0003', N'Libération Conditionnelle', NULL, NULL, N'Cours du Québec', N'500-01-310-35719-654', N'Tentative de meurtre', N'Prison de Port-Cartier', CAST(N'2022-09-19T00:00:00.000' AS DateTime), NULL, N'Benoit Ducharme', N'5142745131', NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (6, 7, N'302-220208-0016', N'Disparu', N'Disparition', NULL, NULL, NULL, NULL, NULL, NULL, N'3546 boul. De la Concorde Est, Laval', NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (7, 8, N'123-201225-0016', N'Interdit', N'Conduite de véhicule', NULL, N'Municipale de Montréal', N'CM-MTL-16794-356', N'Capacité de conduire affaiblie', NULL, CAST(N'2022-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (8, 9, N'123-220115-0015', N'Accusé', NULL, NULL, N'Cour du Québec', N'500-01-310-25846-159', N'Agression armée', NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([Id], [IdPersonne], [NoEvenement], [TypeEvenement], [Raison], [DossierEnquete], [Cour], [NoCour], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [Agent], [Telephone], [Poste]) VALUES (9, 9, N'108-200207-0022', N'Interdit', N'Arme à feu', NULL, N'Cour du Québec', N'500-01-310-23654-846', N'Vol qualifié', NULL, CAST(N'2031-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[IPPE] OFF
GO
SET IDENTITY_INSERT [dbo].[Personnes] ON 
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (1, N'Coutu', N'Jean', N'Pierre', 1, CAST(N'1998-06-24T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (2, N'Ducharme', N'Benoit', NULL, 1, CAST(N'1975-08-31T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (3, N'Sirois', N'Danielle', NULL, 0, CAST(N'1980-02-14T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (4, N'Bélanger', N'Claude', NULL, 1, CAST(N'1976-07-12T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (5, N'Levasseur', N'Marc', NULL, 1, CAST(N'1971-11-07T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (6, N'Hébert', N'Francis', NULL, 1, CAST(N'1992-10-19T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (7, N'Amoussougbo', N'Yaken', NULL, 1, CAST(N'2000-01-14T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Noir', 175, 75, N'Noir', N'Noir', NULL, NULL, NULL, 1, NULL, NULL, N'T-shit vert', N'Jeans bleu', N'Espadrille fluo')
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (8, N'Lemire', N'Jessy', NULL, 0, CAST(N'1985-10-28T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([Id], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (9, N'Michaud', N'Noemie', NULL, 0, CAST(N'2002-07-08T00:00:00.000' AS DateTime), NULL, NULL, N'705 rue Notre-Dame', NULL, N'Repentigny', N'Qc', N'J6A 2X1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Personnes] OFF
GO
SET IDENTITY_INSERT [dbo].[Utilisateurs] ON 
GO
INSERT [dbo].[Utilisateurs] ([Id], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (1, N'1234', N'etud', 1, N'etudiant')
GO
INSERT [dbo].[Utilisateurs] ([Id], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (2, N'5678', N'prof', 0, N'professeur')
GO
SET IDENTITY_INSERT [dbo].[Utilisateurs] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__FPS__3AFC04232AF8A589]    Script Date: 2022-03-04 12:37:27 ******/
ALTER TABLE [dbo].[FPS] ADD UNIQUE NONCLUSTERED 
(
	[NoFPS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Utilisat__DD380E4FCDE609CB]    Script Date: 2022-03-04 12:37:27 ******/
ALTER TABLE [dbo].[Utilisateurs] ADD  CONSTRAINT [UQ__Utilisat__DD380E4FCDE609CB] UNIQUE NONCLUSTERED 
(
	[Identifiant] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Conditions]  WITH CHECK ADD  CONSTRAINT [FK_Conditions_Conditions] FOREIGN KEY([IdIPPE])
REFERENCES [dbo].[IPPE] ([Id])
GO
ALTER TABLE [dbo].[Conditions] CHECK CONSTRAINT [FK_Conditions_Conditions]
GO
ALTER TABLE [dbo].[FPS]  WITH CHECK ADD  CONSTRAINT [FK_FPS_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [dbo].[Personnes] ([Id])
GO
ALTER TABLE [dbo].[FPS] CHECK CONSTRAINT [FK_FPS_Personnes]
GO
ALTER TABLE [dbo].[IPPE]  WITH CHECK ADD  CONSTRAINT [FK_IPPE_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [dbo].[Personnes] ([Id])
GO
ALTER TABLE [dbo].[IPPE] CHECK CONSTRAINT [FK_IPPE_Personnes]
GO

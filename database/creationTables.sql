USE 4D1EquipeXX
GO
ALTER TABLE [dbo].[Personnes] DROP CONSTRAINT [CK_Personnes]
GO
ALTER TABLE [dbo].[PersonnesIPPE] DROP CONSTRAINT [FK_PersonnesIPPE_Personnes]
GO
ALTER TABLE [dbo].[PersonnesIPPE] DROP CONSTRAINT [FK_PersonnesIPPE_IPPE]
GO
ALTER TABLE [dbo].[FPS] DROP CONSTRAINT [FK_FPS_Personnes]
GO
ALTER TABLE [dbo].[Conditions] DROP CONSTRAINT [FK_Conditions_Personnes]
GO
ALTER TABLE [dbo].[Conditions] DROP CONSTRAINT [FK_Conditions_IPPE]
GO
/****** Object:  Index [UQ__Utilisat__DD380E4FCDE609CB]    Script Date: 2022-03-08 14:14:52 ******/
ALTER TABLE [dbo].[Utilisateurs] DROP CONSTRAINT [UQ__Utilisat__DD380E4FCDE609CB]
GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Utilisateurs]') AND type in (N'U'))
DROP TABLE [dbo].[Utilisateurs]
GO
/****** Object:  Table [dbo].[PersonnesIPPE]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[PersonnesIPPE]') AND type in (N'U'))
DROP TABLE [dbo].[PersonnesIPPE]
GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Personnes]') AND type in (N'U'))
DROP TABLE [dbo].[Personnes]
GO
/****** Object:  Table [dbo].[IPPE]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IPPE]') AND type in (N'U'))
DROP TABLE [dbo].[IPPE]
GO
/****** Object:  Table [dbo].[IBVA]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBVA]') AND type in (N'U'))
DROP TABLE [dbo].[IBVA]
GO
/****** Object:  Table [dbo].[IBOB]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBOB]') AND type in (N'U'))
DROP TABLE [dbo].[IBOB]
GO
/****** Object:  Table [dbo].[IBAF]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[IBAF]') AND type in (N'U'))
DROP TABLE [dbo].[IBAF]
GO
/****** Object:  Table [dbo].[FPS]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[FPS]') AND type in (N'U'))
DROP TABLE [dbo].[FPS]
GO
/****** Object:  Table [dbo].[Conditions]    Script Date: 2022-03-08 14:14:52 ******/
IF  EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Conditions]') AND type in (N'U'))
DROP TABLE [dbo].[Conditions]
GO
/****** Object:  Table [dbo].[Conditions]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Conditions](
	[IdCondition] [int] IDENTITY(1,1) NOT NULL,
	[IdIPPE] [int] NOT NULL,
	[IdPersonne] [int] NULL,
	[Libelle] [nvarchar](150) NOT NULL,
	[HeureDebut] [time](7) NULL,
	[HeureFin] [time](7) NULL,
	[Victime] [nvarchar](100) NULL,
	[Frequentation] [nvarchar](100) NULL,
 CONSTRAINT [PK_Conditions] PRIMARY KEY CLUSTERED 
(
	[IdCondition] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[FPS]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[FPS](
	[IdFPS] [int] IDENTITY(1,1) NOT NULL,
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
	[IdFPS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBAF]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBAF](
	[IdIBAF] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[Marque] [nvarchar](50) NOT NULL,
	[Calibre] [nchar](10) NULL,
	[TypeArme] [nvarchar](15) NOT NULL,
	[TypeEvenement] [nvarchar](30) NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBAB] PRIMARY KEY CLUSTERED 
(
	[IdIBAF] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBOB]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBOB](
	[IdBOB] [int] IDENTITY(1,1) NOT NULL,
	[NoSerie] [nvarchar](15) NOT NULL,
	[Marque] [nvarchar](50) NOT NULL,
	[Modele] [nvarchar](50) NULL,
	[TypeObjet] [nvarchar](150) NOT NULL,
	[TypeEvenement] [nvarchar](30) NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBOB] PRIMARY KEY CLUSTERED 
(
	[IdBOB] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IBVA]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IBVA](
	[IdIBVA] [int] IDENTITY(1,1) NOT NULL,
	[Identifiant] [nvarchar](30) NOT NULL,
	[Auteur] [nvarchar](50) NOT NULL,
	[TypeValeur] [nvarchar](30) NOT NULL,
	[TypeEvenement] [nvarchar](30) NULL,
	[NoEvenement] [nchar](15) NULL,
 CONSTRAINT [PK_IBVA] PRIMARY KEY CLUSTERED 
(
	[IdIBVA] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[IPPE]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[IPPE](
	[IdIPPE] [int] IDENTITY(1,1) NOT NULL,
	[NoEvenement] [nchar](15) NOT NULL,
	[TypeEvenement] [nvarchar](30) NOT NULL,
	[Mandat] [nvarchar](100) NULL,
	[Motif] [nvarchar](100) NULL,
	[Nature] [nvarchar](100) NULL,
	[DossierEnquete] [nchar](15) NULL,
	[Cour] [nvarchar](50) NULL,
	[NoMandat] [nvarchar](20) NULL,
	[NoCause] [nvarchar](20) NULL,
	[NatureCrime] [nvarchar](150) NULL,
	[LieuDetention] [nvarchar](30) NULL,
	[FinSentence] [datetime] NULL,
	[VuDerniereFois] [nvarchar](100) NULL,
	[AgentProbation] [nvarchar](150) NULL,
	[AgentLiberation] [nvarchar](150) NULL,
	[Telephone] [nchar](10) NULL,
	[Poste] [nvarchar](6) NULL,
 CONSTRAINT [PK_IPPE] PRIMARY KEY CLUSTERED 
(
	[IdIPPE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Personnes]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Personnes](
	[IdPersonne] [int] IDENTITY(1,1) NOT NULL,
	[TypePersonne] [nvarchar](15) NOT NULL,
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
	[IdPersonne] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[PersonnesIPPE]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[PersonnesIPPE](
	[IdPersonne] [int] NOT NULL,
	[IdIPPE] [int] NOT NULL,
 CONSTRAINT [PK_PersonnesIPPE] PRIMARY KEY CLUSTERED 
(
	[IdPersonne] ASC,
	[IdIPPE] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Utilisateurs]    Script Date: 2022-03-08 14:14:52 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Utilisateurs](
	[IdUtilisateur] [int] IDENTITY(1,1) NOT NULL,
	[Identifiant] [nvarchar](8) NOT NULL,
	[MotDePasse] [nvarchar](max) NOT NULL,
	[Etudiant] [bit] NOT NULL,
	[NomFamille] [nvarchar](50) NOT NULL,
 CONSTRAINT [PK_Utilisateurs] PRIMARY KEY CLUSTERED 
(
	[IdUtilisateur] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
SET IDENTITY_INSERT [dbo].[Conditions] ON 
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (2, 12, 5, N'Avoir comme adresse le
 ', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (3, 12, NULL, N'Ne pas entrer en contact avec ', NULL, NULL, N'Julie Lapierre', NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (4, 12, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (6, 19, 7, N'Avoir comme adresse le ', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (7, 19, NULL, N'Ne pas fréquenter ', NULL, NULL, NULL, N'des gens ayant des dossiers criminels
')
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (8, 19, NULL, N'Aucune consommation d''alcool ou de drogue non prescrite
', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (10, 19, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (12, 18, 6, N'Avoir comme adresse le', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (13, 18, NULL, N'Ne pas entrer en contact avec ', NULL, NULL, N'Alain Coutu', NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (14, 18, NULL, N'Aucune consommation d''alcool ou de drogue non prescrite
', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (15, 18, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (16, 26, 10, N'Avoir comme adresse le
', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (17, 26, NULL, N'Ne pas entrer en contact avec ', NULL, NULL, N'Julie Lapierre', NULL)
GO
INSERT [dbo].[Conditions] ([IdCondition], [IdIPPE], [IdPersonne], [Libelle], [HeureDebut], [HeureFin], [Victime], [Frequentation]) VALUES (18, 26, NULL, N'Doit garder la paix et avoir bonne conduite', NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Conditions] OFF
GO
SET IDENTITY_INSERT [dbo].[Conditions] OFF
GO
SET IDENTITY_INSERT [dbo].[FPS] ON 
GO
INSERT [dbo].[FPS] ([IdFPS], [IdPersonne], [NoFPS], [DateMesure], [CD], [Antecedents], [Violent], [Echappe], [Suicidaire], [Desequilibre], [Contagieux]) VALUES (4, 7, N'438761F', CAST(N'2020-01-01T00:00:00.000' AS DateTime), N'W01', N'Voie de fait', NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[FPS] OFF
GO
SET IDENTITY_INSERT [dbo].[IPPE] ON 
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (8, N'108-220208-0031', N'Recherché', N'Arrestation', NULL, NULL, NULL, N'Municipale de Longueuil', N'CM-LGL-A-26840', NULL, N'Agression armée', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (11, N'302-220131-0056', N'Sous observation', NULL, N'Fréquentation criminelle', NULL, N'LVL-RENS-468259', NULL, NULL, NULL, N'Fraude et prêts usuraires
', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (12, N'123-220115-0014', N'Accusé', NULL, NULL, NULL, NULL, N'Municipale de Montréal', NULL, N'CM- MTL-57931-852', N'Voies de fait
', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (18, N'123-200303-0026', N'Probation', NULL, NULL, NULL, NULL, N'Municipale de Montréal', NULL, N'CM-MTL-58246-829', N'Intimidation
', NULL, CAST(N'2022-03-01T00:00:00.000' AS DateTime), NULL, N'David Chapdelaine
', NULL, N'5142547131', N'222
')
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (19, N'108-110525-0003', N'Libération Conditionnelle', NULL, NULL, NULL, NULL, N'Cour du Québec - Chambre criminelle et pénale', NULL, N'500-01-310-35719-654', N'Tentative de meurtre', N'Prison de Port-Cartier', CAST(N'2022-09-19T00:00:00.000' AS DateTime), NULL, NULL, N'Benoit Ducharme', N'5142547131', NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (20, N'302-220208-0016', N'Disparu', NULL, NULL, N'Disparition', NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'3546 boul. De la Concorde Est, Laval', NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (22, N'123-201225-0016', N'Interdit', NULL, NULL, N'Conduite de véhicule', NULL, N'Municipale de Montréal', NULL, N'CM-MTL-16794-356', N'Capacité de conduite affaiblie', NULL, CAST(N'2022-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (26, N'123-220115-0015', N'Accusé', NULL, NULL, NULL, NULL, N'Cour du Québec', NULL, N'500-01-310-25846-159', N'Agression armée', NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[IPPE] ([IdIPPE], [NoEvenement], [TypeEvenement], [Mandat], [Motif], [Nature], [DossierEnquete], [Cour], [NoMandat], [NoCause], [NatureCrime], [LieuDetention], [FinSentence], [VuDerniereFois], [AgentProbation], [AgentLiberation], [Telephone], [Poste]) VALUES (27, N'108-200207-0022', N'Interdit', NULL, NULL, N'Arme à feu', NULL, N'Cour du Québec', NULL, N'500-01-310-23654-846', N'Vol qualifié', NULL, CAST(N'2031-10-29T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[IPPE] OFF
GO
SET IDENTITY_INSERT [dbo].[Personnes] ON 
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (1, N'Enseignant', N'Coutu', N'Jean', N'Pierre', 1, CAST(N'1998-06-24T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (3, N'Enseignant', N'Ducharme', N'Benoit', NULL, 1, CAST(N'1975-08-31T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (4, N'Personnage', N'Sirois', N'Danielle', NULL, 0, CAST(N'1980-02-14T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (5, N'Personnage', N'Bélanger', N'Claude', NULL, 1, CAST(N'1976-07-12T00:00:00.000' AS DateTime), NULL, NULL, N'705 rue Notre-Dame
', NULL, N'Repentigny', N'Qc', N'J6A 2X1', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (6, N'Enseignant', N'Levasseur', N'Marc', NULL, 1, CAST(N'1971-11-07T00:00:00.000' AS DateTime), NULL, NULL, N'3800 rue Sherbrooke Est', NULL, N'Montréal', N'Qc', N'H1X 2A2', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (7, N'Personnage', N'Hébert', N'Francis', NULL, 1, CAST(N'1992-10-19T00:00:00.000' AS DateTime), NULL, NULL, N'150 Pl. Charles-Le Moyne', NULL, N'Longueuil', N'Qc', N'J4K 0A8', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (8, N'Étudiant', N'Amoussougbo', N'Yaken', NULL, 1, CAST(N'2000-03-04T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, N'Noir', 175, 75, N'Noir', N'Noir', NULL, NULL, NULL, 1, NULL, NULL, N'T-shirt vert', N'Jeans bleu', N'Espadrille fluo')
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (9, N'Enseignant', N'Lemire', N'Jessy', NULL, 0, CAST(N'1985-10-28T00:00:00.000' AS DateTime), NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
INSERT [dbo].[Personnes] ([IdPersonne], [TypePersonne], [NomFamille], [Prenom1], [Prenom2], [Masculin], [DateNaissance], [Telephone], [NoPermis], [Adresse1], [Adresse2], [Ville], [Province], [CodePostal], [Race], [Taille], [Poids], [Yeux], [Cheveux], [Marques], [Toxicomanie], [Desorganise], [Depressif], [Suicidaire], [Violent], [Gilet], [Pantalon], [AutreVetement]) VALUES (10, N'Étudiant', N'Michaud', N'Noémie', NULL, 0, CAST(N'2002-07-08T00:00:00.000' AS DateTime), NULL, NULL, N'49 route du Long-Sault', N'null', N'St-André d''Argenteuil', N'Qc', N'J0V 1X0', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL)
GO
SET IDENTITY_INSERT [dbo].[Personnes] OFF
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (3, 8)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (4, 11)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (5, 12)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (6, 18)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (7, 19)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (8, 20)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (9, 22)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (10, 26)
GO
INSERT [dbo].[PersonnesIPPE] ([IdPersonne], [IdIPPE]) VALUES (10, 27)
GO
SET IDENTITY_INSERT [dbo].[Utilisateurs] ON 
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (1, N'e1233772', N'bonjour', 1, N'Aganier')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (2, N'e1233152', N'bonjour', 1, N'Lamarre')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (4, N'e1236443', N'bonjour', 1, N'Masse')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (5, N'e1235341', N'bonjour', 1, N'Busseau')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (6, N'e1231880', N'bonjour', 1, N'Vaillancourt')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (7, N'e1237247', N'bonjour', 1, N'Talbot')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (8, N'e1239547', N'bonjour', 1, N'Lafleur')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (9, N'e1233306', N'bonjour', 1, N'Wilson')
GO
INSERT [dbo].[Utilisateurs] ([IdUtilisateur], [Identifiant], [MotDePasse], [Etudiant], [NomFamille]) VALUES (10, N'e1234634', N'bonjour', 1, N'Gagnon')
GO
SET IDENTITY_INSERT [dbo].[Utilisateurs] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__FPS__3AFC0423ED96710E]    Script Date: 2022-03-08 14:14:53 ******/
ALTER TABLE [dbo].[FPS] ADD UNIQUE NONCLUSTERED 
(
	[NoFPS] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__Utilisat__DD380E4FCDE609CB]    Script Date: 2022-03-08 14:14:53 ******/
ALTER TABLE [dbo].[Utilisateurs] ADD  CONSTRAINT [UQ__Utilisat__DD380E4FCDE609CB] UNIQUE NONCLUSTERED 
(
	[Identifiant] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Conditions]  WITH CHECK ADD  CONSTRAINT [FK_Conditions_IPPE] FOREIGN KEY([IdIPPE])
REFERENCES [dbo].[IPPE] ([IdIPPE])
GO
ALTER TABLE [dbo].[Conditions] CHECK CONSTRAINT [FK_Conditions_IPPE]
GO
ALTER TABLE [dbo].[Conditions]  WITH CHECK ADD  CONSTRAINT [FK_Conditions_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [dbo].[Personnes] ([IdPersonne])
GO
ALTER TABLE [dbo].[Conditions] CHECK CONSTRAINT [FK_Conditions_Personnes]
GO
ALTER TABLE [dbo].[FPS]  WITH CHECK ADD  CONSTRAINT [FK_FPS_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [dbo].[Personnes] ([IdPersonne])
GO
ALTER TABLE [dbo].[FPS] CHECK CONSTRAINT [FK_FPS_Personnes]
GO
ALTER TABLE [dbo].[PersonnesIPPE]  WITH CHECK ADD  CONSTRAINT [FK_PersonnesIPPE_IPPE] FOREIGN KEY([IdIPPE])
REFERENCES [dbo].[IPPE] ([IdIPPE])
GO
ALTER TABLE [dbo].[PersonnesIPPE] CHECK CONSTRAINT [FK_PersonnesIPPE_IPPE]
GO
ALTER TABLE [dbo].[PersonnesIPPE]  WITH CHECK ADD  CONSTRAINT [FK_PersonnesIPPE_Personnes] FOREIGN KEY([IdPersonne])
REFERENCES [dbo].[Personnes] ([IdPersonne])
GO
ALTER TABLE [dbo].[PersonnesIPPE] CHECK CONSTRAINT [FK_PersonnesIPPE_Personnes]
GO
ALTER TABLE [dbo].[Personnes]  WITH CHECK ADD  CONSTRAINT [CK_Personnes] CHECK  (([TypePersonne]='Personnage' OR [TypePersonne]='Comédien' OR [TypePersonne]='Étudiant' OR [TypePersonne]='Enseignant'))
GO
ALTER TABLE [dbo].[Personnes] CHECK CONSTRAINT [CK_Personnes]
GO

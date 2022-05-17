export class QL {
  headers() {
    const head = new Headers();
    head.append('Content-type', 'application/json');
    return head;
  }
  /** Récupérer les données globales du menu, catégories et articles */
  reqAll() {
    return JSON.stringify({
      query: `{
        menus(pagination: { page: 1, pageSize: 20 }){
          data{
            id
            attributes{
              Lien{
                Titre
                Alias
                Url
                Description
                Cible
              }
              Article{
                data{
                  id
                  attributes{
                    Titre
                    Alias
                    Intro
              Contenu
              MediaIntro{
                data{
                  attributes{
                    name
                    url
                    previewUrl
                  } 
                }
              }
              MediaContenu{
                data{
                  attributes{
                    name
                    url
                    previewUrl
                  } 
                }
              }
            }
          }
        }
        Categorie{
          data{
            attributes{
              Titre
              Alias
              Description
              Media{
                data{
                  attributes{
                    name
                    url
                  } 
                }
              }
              Ordre
              Articles{
                data{
                  id
                  attributes{
                    Titre
                    Alias
                    Intro
                    Contenu
                    MediaIntro{
                      data{
                        attributes{
                          name
                          url
                          previewUrl
                        } 
                      }
                    }
                    MediaContenu{
                      data{
                       attributes{
                          name
                          url
                          previewUrl
                        } 
                      }
                    }
                  }
                }
              }
            }
          }
        }
              Ordre
              Rattachement{
                data{
                  attributes{
                    Titre
                    Alias
                    Type
                  } 
                }
              }
              Parent{
                data{
                  id
                }
              }
              Template{
                data{
                  id
                  attributes{
                    Titre
                  }
                }
              }
            }
          }
        }
      }`
    })
  }

  /** Requete pour récupérer la liste des articles */
  reqArticles() {
    return JSON.stringify({
      query: `{
            articles{
            data{
                id
                attributes{
                Titre
                Intro
                MediaIntro{
                    data{
                    id
                    attributes{
                        name
                        url
                        previewUrl
                    }
                    }
                }
                Contenu
                MediaContenu{
                    data{
                    id
                    attributes{
                        name
                        url
                        previewUrl
                    }
                    }
                }
                Categorie{
                    data{
                    id
                    attributes{
                        Titre
                        Description
                        Media{
                        data{
                            id
                            attributes{
                            name
                            url
                            previewUrl
                            }
                        }
                        }
                    }
                    }
                }
                }
            }
            }
        }`})
  };
  /** Récupérer une catégorie en particulier */
  reqCategorie() {

  }
  // Requete pour récupérer la liste des catégories
  reqCategories() {
    return JSON.stringify({
      query: `{
        categories{
          data{
            id
            attributes{
              Titre
              Alias
              Description
              Ordre
              Articles{
                data{
                  id
                  attributes{
                    Titre
                    Alias
                    Intro
                    Contenu
                    Liens{
                      Titre
                      Url
                      Description
                      Cible
                    }
                    MediaIntro{
                      data{
                        attributes{
                          name
                          url
                        }
                      }
                    }
                    MediaContenu{
                      data{
                        attributes{
                          name
                          url
                        }
                      }
                    }
                  }
                }
              }
              Media{
                data{
                  attributes{
                    name
                    url
                  }
                }
              }
            }
          }
        }
      }`});
  };

  /** Requete pour récupérer la liste des articles */
  reqDocs() {
    return JSON.stringify({
      query: `{
      documents{
        data{
          id
          attributes{
            Titre
            Alias
            Description
            Lien{
              Titre
              Url
              Description
              Cible
            }
          }
        }
      }
    }`
    })
  };
}
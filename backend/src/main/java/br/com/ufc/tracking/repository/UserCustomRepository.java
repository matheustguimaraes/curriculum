package br.com.ufc.tracking.repository;

import br.com.ufc.tracking.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import java.util.List;

@Repository
public class UserCustomRepository {

    private final EntityManager em;

    public UserCustomRepository(EntityManager em) {
        this.em = em;
    }

    public List<User> find(Long id, String name, String email) {

        String query = "select P from User as P ";
        String condicao = "where";

        if(id != null) {
            query += condicao + " P.id = :id";
            condicao = " and ";
        }

        if(name != null) {
            query += condicao + " P.name = :name";
            condicao = " and ";
        }

        if(email != null) {
            query += condicao + " P.email = :email";
        }

        var q = em.createQuery(query, User.class);

        if(id != null) {
            q.setParameter("id", id);
        }

        if(name != null) {
            q.setParameter("name", name);
        }

        if(email != null) {
            q.setParameter("email", email);
        }

        return q.getResultList();
    }

}

package br.com.ufc.tracking.repository;

import br.com.ufc.tracking.model.Activity;
import br.com.ufc.tracking.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.Query;
import java.util.List;

@Repository
public class ActivityCustomRepository {

    private final EntityManager em;

    public ActivityCustomRepository(EntityManager em) {
        this.em = em;
    }

    public List<Activity> find(Long id, String activity) {

        String query = "select P from Activity as P ";
        String condicao = "where";

        if (id != null) {
            query += condicao + " P.id = :id";
            condicao = " and ";
        }

        if (activity != null) {
            query += condicao + " P.activity = :activity";
            condicao = " and ";
        }

        Query q = em.createQuery(query, Activity.class);

        if (id != null) {
            q.setParameter("id", id);
        }

        if (activity != null) {
            q.setParameter("activity", activity);
        }

        return q.getResultList();
    }

}

package br.com.ufc.tracking.controller.dto;

import br.com.ufc.tracking.model.Activity;

public class ActivityResponse {

    private Long id;
    private Long user;
    private String activity;

    public static ActivityResponse converter(Activity p) {
        ActivityResponse atv = new ActivityResponse();
        atv.setId(p.getId());
        atv.setUser(p.getUser());
        atv.setActivity(p.getActivity());
        return atv;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUser() {
        return user;
    }

    public void setUser(Long user) {
        this.user = user;
    }

    public String getActivity() {
        return activity;
    }

    public void setActivity(String activity) {
        this.activity = activity;
    }
}

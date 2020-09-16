package br.com.ufc.tracking.controller;

import br.com.ufc.tracking.controller.dto.ActivityRequest;
import br.com.ufc.tracking.controller.dto.ActivityResponse;
import br.com.ufc.tracking.model.Activity;
import br.com.ufc.tracking.repository.ActivityCustomRepository;
import br.com.ufc.tracking.repository.ActivityRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
public class ActivityController {

    private final ActivityRepository activityRepository;
    private final ActivityCustomRepository activityCustomRepository;

    public ActivityController(ActivityRepository activityRepository, ActivityCustomRepository activityCustomRepository) {
        this.activityRepository = activityRepository;
        this.activityCustomRepository = activityCustomRepository;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/activity")
    public List<ActivityResponse> findAll() {
        var activity = activityRepository.findAll();
        return activity
                .stream()
                .map(ActivityResponse::converter)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/activity/{id}")
    public ActivityResponse findById(@PathVariable("id") Long id) {
        var pessoa = activityRepository.getOne(id);
        return ActivityResponse.converter(pessoa);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/activity")
    public void saveActivity(@RequestBody ActivityRequest atv) {
        var p = new Activity();
        p.setActivity(atv.getActivity());
        p.setUser(atv.getUser());
        activityRepository.save(p);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PutMapping("/activity/{id}")
    public void updateActivity(@PathVariable("id") Long id, @RequestBody ActivityRequest atv) throws Exception {
        var p = activityRepository.findById(id);

        if (p.isPresent()) {
            var pessoaSave = p.get();
            pessoaSave.setActivity(atv.getActivity());
            activityRepository.save(pessoaSave);
        } else {
            throw new Exception("Atividade Não encontrada");
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @DeleteMapping("/activity/{id}")
    public void deleteActivity(@PathVariable("id") Long id) throws Exception {
        var p = activityRepository.findById(id);

        if (p.isPresent()) {
            activityRepository.deleteById(id);
        } else {
            throw new Exception("Atividade não deletada");
        }
    }


    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/activity/filter")
    public List<ActivityResponse> findActivityByName(@RequestParam("activity") String atv) {
        return this.activityRepository.findByActivityContains(atv)
                .stream()
                .map(ActivityResponse::converter)
                .collect(Collectors.toList());
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/activity/filter/custom")
    public List<ActivityResponse> findActivityByCustom(
            @RequestParam(value = "id", required = false) Long id,
            @RequestParam(value = "atividade", required = true) String atividade
    ) {
        return this.activityCustomRepository.find(id, atividade)
                .stream()
                .map(ActivityResponse::converter)
                .collect(Collectors.toList());
    }

}

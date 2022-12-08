package prova;
import com.intuit.karate.junit5.Karate;

class provaRunner {
    
    @Karate.Test
    Karate testGorest() {
        return Karate.run("prova").relativeTo(getClass());
    }    
}

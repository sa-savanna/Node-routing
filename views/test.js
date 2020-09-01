
<div class="bg-1">
    <main class="grid">
        <% ices.forEach(ice => {%>
            <article>
                <img src="<%= ice.image %>" class="card-img" alt="...">
                    <div class="text">
                        <h5 class="card-title"><%= ice.header %></h5>
                        <p class="card-text"><%= ice.description %></p>
                        <p class="card-text"><small class="text-muted"><%= ice.createAt.toDateString() %></small>
                        </p>
                        <a href="/blog/<%= ice._id %>" class="btn btn-info">Jump to recipe</a>
                    </div>
        </article>
                <% }) %>
    </main>

</div>









    <div class="bg-1">
        <div class="container">
            <% ices.forEach(ice => {%>
                <div class="item">
                    <div class="img">
                        <img src="<%= ice.image %>" class="card-img" alt="...">
        </div>
                        <div class="text">
                            <h5 class="card-title"><%= ice.header %></h5>
                            <p class="card-text"><%= ice.description %></p>
                            <p class="card-text"><small class="text-muted"><%= ice.createAt.toDateString() %></small>
                            </p>
                            <a href="/blog/<%= ice._id %>" class="btn btn-info">Jump to recipe</a>
                        </div>
                    </div>

                    <% }) %>
</div>
</div>








        <div class="bg-1">
            <div class="card-deck p-2">
                <% ices.forEach(ice => {%>
                    <div class="card mb-1 col-lg-12 col-md-6">
                        <div class="row no-gutters">
                            <div class="col-md-4 col-lg-4">
                                <img src="<%= ice.image %>" class="card-img" alt="...">
                                </div>
                                <div class="col-md-8 col-lg-8">
                                    <div class="card-body">
                                        <h5 class="card-title"><%= ice.header %></h5>
                                        <p class="card-text"><%= ice.description %></p>
                                        <p class="card-text"><small class="text-muted"><%= ice.createAt.toDateString() %></small>
                                        </p>
                                        <a href="/blog/<%= ice._id %>" class="btn btn-info">Jump to recipe</a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <% }) %>
          </div>
            </div>